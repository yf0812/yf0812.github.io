(() => {
  const root = document.getElementById('analog-implementation');
  const scenes = root.querySelector('#ai-scenes');
  const interests=root.querySelector('.ai-section > div');
  function sizeToInterests(){
    root.style.setProperty('--interests-height',interests.getBoundingClientRect().height+'px');
  }
  sizeToInterests();
  new ResizeObserver(sizeToInterests).observe(interests);
  function el(tag, attrs, parent) {
    const node = document.createElementNS('http://www.w3.org/2000/svg',tag);
    Object.entries(attrs).forEach(([key,value])=>node.setAttribute(key,value));
    parent.appendChild(node);
    return node;
  }
  const group = (parent,attrs={}) => el('g',attrs,parent);
  const path = (parent,d,attrs={}) => el('path',{d,fill:'none','stroke-linecap':'round','stroke-linejoin':'round',...attrs},parent);
  const progress = (value,start,end) => Math.max(0,Math.min(1,(value-start)/(end-start)));
  const smooth = x => x*x*(3-2*x);
  const mix = (a,b,x) => a+(b-a)*x;
  const opacity = (node,v) => node.setAttribute('opacity',v);
  const rect = (parent,x,y,width,height,attrs={}) => el('rect',{x,y,width,height,...attrs},parent);
  const circle = (parent,cx,cy,r,attrs={}) => el('circle',{cx,cy,r,...attrs},parent);
  const projected = (node,m) => node.setAttribute('transform','matrix('+m.join(' ')+')');
  const shifted = (m,z) => [m[0],m[1],m[2],m[3],m[4],m[5]-z];

  // Schematic scene
  function makeSchematic(parent, {testbench=true}={}) {
    const copper = '#975a31';
    const mint = '#186b61';
    const blue = '#526c90';
    const rail = '#4e5554';
    const dim = '#77817d';
    const board = '#fafbf9';
    const art = group(parent, { role: 'img', 'aria-label': 'Five-transistor OTA. An NMOS differential pair drives a PMOS current mirror and a single-ended output. The tail transistor sets the bias current.' });
    const ink = group(art, { fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
    const nets = [];
    const devices = [];
    const terminals = [];
    const carriers = [];
    const traces = [];

    function line(where, d, tone, width, extra = {}) {
      return path(where, d, { fill: 'none', stroke: tone, 'stroke-width': width, ...extra });
    }
    function net(d, tone, start, end, width = 2.5) {
      line(ink, d, dim, width, { opacity: .36 });
      const highlight = line(ink, d, tone, width, { pathLength: 1, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1 });
      nets.push({ node: highlight, start, end });
    }
    function dot(x, y, tone, start) {
      const node = el('circle', { cx: x, cy: y, r: 3.8, fill: tone, stroke: board, 'stroke-width': .8 }, ink);
      terminals.push({ node, start });
    }
    function port(x, y, tone, start) {
      const node = group(ink);
      el('circle', { cx: x, cy: y, r: 5, fill: board, stroke: tone, 'stroke-width': 2.4 }, node);
      terminals.push({ node, start });
    }
    function fet(x, y, side, pmos, tone, start) {
      const shell = group(ink, { transform: 'translate(' + x + ' ' + y + ') scale(' + side + ' 1)' });
      const body = group(shell);
      // Terminals are at (0, -23), (0, +23), and (33, 0) in symbol coordinates.
      line(body, 'M0 -23v11h8 M0 23V12h8 M8 -13v26', tone, 3.1);
      line(body, 'M15 -13v26', tone, 2.5);
      if (pmos) {
        el('circle', { cx: 19, cy: 0, r: 3.5, stroke: tone, 'stroke-width': 2, fill: board }, body);
        line(body, 'M22.5 0H33', tone, 2.3);
      } else {
        line(body, 'M15 0H33', tone, 2.3);
      }
      devices.push({ body, start });
    }
    // Common PMOS sources at VDD. Left PMOS drain folds back to its gate and the right mirror gate.
    net('M300 31v15H232v17', rail, .04, .19);
    net('M300 46h68v17', rail, .07, .21);
    net('M232 109v45', copper, .13, .34);
    net('M232 127h54V86h49', copper, .14, .37);
    net('M286 86h-21', copper, .16, .33);
    net('M368 109v45', copper, .17, .38);
    net('M368 127h136', rail, .20, .49);
    line(ink, 'M289 30h22', rail, 3);
    dot(300, 46, rail, .13);
    dot(232, 127, copper, .25);
    dot(286, 86, copper, .32);
    dot(368, 127, copper, .30);
    port(507, 127, copper, .45);

    // NMOS inputs, joined sources and the bias transistor.
    net('M111 177h88', mint, .12, .35);
    net('M474 177h-73', mint, .14, .37);
    net('M232 200v15h68v13', mint, .23, .47);
    net('M368 200v15h-68', mint, .25, .49);
    net('M220 251h47', blue, .31, .50);
    net('M300 274v18', blue, .32, .50);
    dot(300, 215, mint, .40);
    port(108, 177, mint, .15);
    port(477, 177, mint, .17);
    port(217, 251, blue, .34);
    line(ink, 'M90 177h8m-4-4v8 M488 177h8', mint, 1.7);
    line(ink, 'M288 292h24m-20 5h16m-12 5h8', blue, 2.1);
    fet(232, 86,  1, true,  copper, .02);
    fet(368, 86, -1, true,  copper, .04);
    fet(232,177, -1, false, mint,   .09);
    fet(368,177,  1, false, mint,   .12);
    fet(300,251, -1, false, blue,   .21);

    // In the illustrative positive differential step the left input current rises,
    // the mirrored current rises and the right input current falls.
    function branch(x, first, last, color, shift, amplitude) {
      const node = group(ink);
      el('circle', { r: 6, fill: color, opacity: .16 }, node);
      el('circle', { r: 2.8, fill: color }, node);
      carriers.push({ node, x, first, last, shift, amplitude });
    }
    if(testbench){
      branch(232, 109, 153, copper, .1, 1);
      branch(368, 109, 127, copper, .1, .9);
      branch(368, 131, 153, mint, .55, .38);
      branch(300, 216, 228, blue, .35, .9);
    }
    // Miniature stimuli and first-pass response stay outside the circuit's net paths.
    function stimulus(d, color, sx, sy, start, end) {
      line(ink, 'M' + sx + ' ' + sy + 'h55', dim, 1);
      const node = line(ink, d, color, 2, { pathLength: 1, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1 });
      traces.push({ node, start, end });
    }
    if(testbench){
      stimulus('M93 151h12v-15h23v15h14', mint, 89, 155, .47, .75);
      stimulus('M465 106h10c6 0 8-14 18-14h8c4 0 5 12 14 12h4', copper, 463, 110, .55, .85);
    }
    return function renderSchematic(q) {
      for (const { node, start, end } of [...nets, ...traces]) {
        node.setAttribute('stroke-dashoffset', 1 - smooth(progress(q, start, end)));
      }
      for (const { body, start } of devices) opacity(body, .45 + .55 * smooth(progress(q, start, start + .22)));
      for (const { node, start } of terminals) opacity(node, .36 + .64 * smooth(progress(q, start, start + .12)));
      const active = smooth(progress(q, .49, .57));
      for (const { node, x, first, last, shift, amplitude } of carriers) {
        const travel = ((Math.max(0, q - .49) * 4.1 + shift) % 1);
        const weight = Math.min(1, 6 * travel, 6 * (1 - travel));
        node.setAttribute('transform', 'translate(' + x + ' ' + (first + (last - first) * travel) + ')');
        opacity(node, active * weight * amplitude);
      }
    };
  }

  // Post-layout transient scene
  // A normalized small-signal unity-gain step test. The reference has one
  // dominant closed-loop pole. Added load slows it, and the output wire adds a
  // second pole. The boundary traces are an RC sensitivity sweep, not PDK corners.
  function makeScope(parent, {routeCapRatio = 0.30} = {}) {
    const scope = group(parent, {role: 'img'});
    el('title', {}, scope).textContent = 'Post-layout unity-gain step verification';
    el('desc', {}, scope).textContent = 'The upper channel applies a step to a voltage follower. ' +
      'The lower channel compares a dashed schematic response, the solid extracted-RC response, ' +
      'and a shaded sweep of RC loading. The bracket measures settling within two percent. ' +
      'These are illustrative, normalized small-signal models.';
    const id = 'ota-scope-' + ((makeScope.instances || 0) + 1);
    makeScope.instances = (makeScope.instances || 0) + 1;
    const defs = el('defs', {}, scope);
    const paint = {
      shell: '#e8ebe7', lip: '#f5f6f3', display: '#fdfefb', rule: '#8a9590',
      grid: '#c0cbc5', dim: '#525f5b', input: '#516f8d',
      schematic: '#945b36', extracted: '#166b60', sweep: '#6686a3'
    };
    const panel = (x,y,width,height,rx,attrs,target=scope) =>
      el('rect', {x,y,width,height,rx,...attrs},target);
    const line = (target,d,stroke,width=1,attrs={}) =>
      path(target,d,{fill:'none',stroke,'stroke-width':width,'stroke-linecap':'round','stroke-linejoin':'round',...attrs});
    const dot = (target,x,y,r,attrs) => el('circle',{cx:x,cy:y,r,...attrs},target);

    // Recessed scope display, with a voltage-follower testbench on its bezel.
    panel(321,78,237,177,10,{fill:'#606b63',opacity:.12});
    panel(318,73,239,178,10,{fill:paint.shell,stroke:'#526f7e','stroke-width':1.2});
    line(scope,'M327 75H548', '#6a8490',1,{opacity:.54});
    panel(326,81,223,161,6,{fill:paint.lip,stroke:'#264651'});
    const follower = group(scope, {'aria-label':'Unity-gain voltage follower'});
    line(follower,'M334 96h14 M334 96v-4h5',paint.input,1.6);
    line(follower,'M348 86l22 11-22 11Z',paint.dim,1.5);
    line(follower,'M351 93h5m-2.5-2.5v5 M351 101h5',paint.dim,1.15);
    line(follower,'M370 97h10v14h-39v-10h7 M380 97h9',paint.extracted,1.55);
    dot(follower,380,97,1.8,{fill:paint.extracted});
    // A dashed reference and a solid extracted channel use the same coding as
    // their traces; it remains readable even on a monochrome display.
    line(scope,'M501 98h14',paint.schematic,1.6,{'stroke-dasharray':'3 3'});
    line(scope,'M522 98h14',paint.extracted,2.1);
    panel(332,115,211,114,2,{fill:paint.display,stroke:'#345764','stroke-width':.9});
    const x0 = 336, x1 = 539, yBase = 216, swing = 50, tStep = .09;
    const xAt = t => x0+(x1-x0)*t;
    const yAt = v => yBase-swing*v;
    for (let x=x0; x<=x1; x+=17) line(scope,`M${x} 116v111`,paint.grid,.65,{opacity:.58});
    for (let y=124; y<229; y+=14) line(scope,`M333 ${y}h209`,paint.grid,.65,{opacity:.58});
    line(scope,'M333 151h209',paint.rule,.9,{opacity:.84});
    line(scope,`M${x0} ${yBase}H${x1}`,paint.dim,.65,{'stroke-dasharray':'2 3',opacity:.58});

    const makeSweepMask = (suffix) => {
      const clip = el('clipPath',{id:id+'-'+suffix,clipPathUnits:'userSpaceOnUse'},defs);
      return panel(x0-1,115,1,114,0,{},clip);
    };
    const mainMask = makeSweepMask('nominal'), cornerMask = makeSweepMask('corners');
    const band = group(scope, {'clip-path':`url(#${id}-corners)`});
    const traces = group(scope, {'clip-path':`url(#${id}-nominal)`});
    const cursor = line(scope,'M0 119V225',paint.extracted,1,{opacity:0});
    const cornerCursor = line(scope,'M0 153V225',paint.sweep,.85,{opacity:0,'stroke-dasharray':'2 3'});
    const front = dot(scope,x0,yBase,2.6,{fill:paint.extracted,stroke:paint.lip,'stroke-width':1});

    const fraction = Number.isFinite(routeCapRatio) ? Math.max(0,Math.min(1,routeCapRatio)) : .3;
    const nominalTau = .093;
    const ramp = (time, scale=1, extracted=true) => {
      const t = Math.max(time-tStep,0);
      if (!extracted) return 1-Math.exp(-t/nominalTau);
      const a = nominalTau*(1+fraction)*scale;
      const b = (.011+.074*fraction)*scale;
      return 1-(a*Math.exp(-t/a)-b*Math.exp(-t/b))/(a-b);
    };
    const strokePoints = fn => Array.from({length:205}, (_,index) => {
      const t = index/204;
      return [xAt(t).toFixed(2),yAt(fn(t)).toFixed(2)].join(' ');
    });
    const fast = strokePoints(t=>ramp(t,.84)), slow = strokePoints(t=>ramp(t,1.20));
    path(band,'M'+fast.join(' L')+' L'+slow.slice().reverse().join(' L')+' Z',{fill:paint.sweep,opacity:.21});
    for (const edge of [fast,slow]) {
      line(band,'M'+edge.join(' L'),paint.sweep,.9,{opacity:.69,'stroke-dasharray':'2.5 3'});
    }
    const tolerance = panel(xAt(tStep),yAt(1.02),x1-xAt(tStep),swing*.04,0,{fill:paint.extracted,opacity:.16},traces);
    line(traces,`M${x0} 141H${xAt(tStep)}V123H${x1}`,paint.input,1.7);
    line(traces,'M'+strokePoints(t=>ramp(t,1,false)).join(' L'),paint.schematic,1.75,{'stroke-dasharray':'4 3'});
    line(traces,'M'+strokePoints(t=>ramp(t)).join(' L'),paint.extracted,2.55);

    const settling = group(scope,{opacity:0});
    let lo=tStep,hi=1;
    for (let i=0;i<22;i++) {
      const mid=(lo+hi)/2;
      if (ramp(mid)<.98) lo=mid; else hi=mid;
    }
    const settleX=xAt(hi);
    line(settling,`M${xAt(tStep)} 230v6m0-3H${settleX}m0-3v6`,paint.extracted,1);
    line(settling,`M${settleX} 227V${yAt(.98)}`,paint.extracted,.8,{'stroke-dasharray':'2 3',opacity:.67});
    dot(settling,settleX,yAt(.98),2.7,{fill:paint.lip,stroke:paint.extracted,'stroke-width':1.25});
    // One signal jack to receive the extracted network from the scene to its left.
    dot(scope,319,149,3,{fill:paint.display,stroke:paint.extracted,'stroke-width':1.4});

    return function renderScope(q) {
      const nominal=progress(q,.04,.72);
      const corners=progress(q,.72,.95);
      mainMask.setAttribute('width',1+(x1-x0+2)*nominal);
      cornerMask.setAttribute('width',1+(x1-x0+2)*corners);
      cursor.setAttribute('transform',`translate(${xAt(nominal)} 0)`);
      cornerCursor.setAttribute('transform',`translate(${xAt(corners)} 0)`);
      opacity(cursor,.53*progress(q,.04,.10)*(1-progress(q,.69,.72)));
      opacity(cornerCursor,.50*progress(q,.72,.76)*(1-progress(q,.92,.95)));
      front.setAttribute('cx',xAt(nominal));
      front.setAttribute('cy',yAt(ramp(nominal)));
      opacity(front,progress(q,.04,.08)*(1-progress(q,.68,.72)));
      opacity(tolerance,.12+.15*progress(q,.70,.80));
      opacity(settling,smooth(progress(q,.92,1)));
    };
  }

  // Parallel unit devices implement each input transistor as two identical fingers (A B B A).
  const devices = [
    {name:'P1',x:79,y:45,nets:['vdd','mirror','mirror'],color:'#9b653e',from:[-46,-25]},
    {name:'P2',x:181,y:45,nets:['vdd','mirror','out'],color:'#9b653e',from:[45,-24]},
    {name:'A1',x:49,y:96,nets:['tail','plus','mirror'],color:'#3b8578',from:[-37,39]},
    {name:'B1',x:102,y:96,nets:['tail','minus','out'],color:'#64859e',from:[-16,-52]},
    {name:'B2',x:158,y:96,nets:['tail','minus','out'],color:'#64859e',from:[51,34]},
    {name:'A2',x:211,y:96,nets:['tail','plus','mirror'],color:'#3b8578',from:[32,-34]},
    {name:'N5',x:130,y:139,nets:['vss','bias','tail'],color:'#877598',from:[-63,22]}
  ];
  const buses={vdd:[12,248],mirror:[49,null],out:[65,248],plus:[80,12],minus:[89,248],
               tail:[117,null],bias:[144,12],vss:[163,248]};
  const terminals=devices.flatMap(cell=>[[-11,0],[0,-12],[11,0]].map(([dx,dy],i)=>({
    net:cell.nets[i],x:cell.x+dx,y:cell.y+dy,fanout:[-8,cell.x<130?-9:9,8][i]
  }))).concat([{net:'vdd',x:224,y:45,fanout:8},{net:'vss',x:20,y:139,fanout:-6}]);
  // A separate M2 column for each pin avoids shorts. M1 fans out from the contacts.
  const columns=Array.from({length:47},(_,i)=>15+i*5);
  for(const pin of terminals){
    const target=pin.x+pin.fanout;
    columns.sort((a,b)=>Math.abs(a-target)-Math.abs(b-target));
    pin.col=columns.shift(); pin.row=buses[pin.net][0];
  }
  const nets=Object.keys(buses);
  const m3=nets.map(net=>{
    const coords=terminals.filter(p=>p.net===net).map(p=>p.col);
    const [y,pad]=buses[net];
    if(pad!==null) coords.push(pad);
    return {net,y,lo:Math.min(...coords),hi:Math.max(...coords),pad};
  });

  // Extract connectivity from the drawn metal rectangles and via positions.
  const shapes=[];
  const conductor=(layer,x1,y1,x2,y2,width,net)=>({
    layer,net,l:Math.min(x1,x2)-width/2,r:Math.max(x1,x2)+width/2,
    t:Math.min(y1,y2)-width/2,b:Math.max(y1,y2)+width/2
  });
  for(const pin of terminals){
    shapes.push(conductor(1,pin.x,pin.y,pin.col,pin.y,2.8,pin.net));
    shapes.push(conductor(2,pin.col,pin.y,pin.col,pin.row,2.4,pin.net));
  }
  m3.forEach(bus=>shapes.push(conductor(3,bus.lo,bus.y,bus.hi,bus.y,3.2,bus.net)));
  const labels=shapes.map((_,i)=>i);
  const representative=i=>{while(labels[i]!==i) i=labels[i]; return i;};
  const join=(a,b)=>{labels[representative(b)]=representative(a);};
  const gap=(a,b)=>Math.hypot(Math.max(0,a.l-b.r,b.l-a.r),Math.max(0,a.t-b.b,b.t-a.b));
  let minClearance=Infinity;
  shapes.forEach((a,i)=>shapes.slice(i+1).forEach((b,k)=>{
    if(a.layer!==b.layer) return;
    const g=gap(a,b);
    if(g===0) join(i,i+1+k);
    if(a.net!==b.net) minClearance=Math.min(minClearance,g);
  }));
  for(const pin of terminals){
    for(const [upper,y] of [[2,pin.y],[3,pin.row]]){
      const landed=shapes.map((s,i)=>s.layer>=upper-1 && s.layer<=upper && pin.col>=s.l && pin.col<=s.r && y>=s.t && y<=s.b ? i : -1).filter(i=>i>=0);
      landed.slice(1).forEach(i=>join(landed[0],i));
    }
  }
  const connected=shapes.every((a,i)=>shapes.every((b,j)=>(a.net===b.net)===(representative(i)===representative(j))));
  const drcPass=minClearance>=1.5;
  const parallelPairs=terminals.flatMap((p,i)=>terminals.slice(i+1).map(q=>{
    const lo=Math.max(Math.min(p.y,p.row),Math.min(q.y,q.row)),hi=Math.min(Math.max(p.y,p.row),Math.max(q.y,q.row));
    return {p,q,lo,hi,separation:Math.abs(p.col-q.col)-2.4};
  })).filter(({p,q,lo,hi})=>p.net!==q.net && hi-lo>7).sort((a,b)=>a.separation-b.separation);
  const exampleSpacing=parallelPairs[0];
  const outBus=m3.find(b=>b.net==='out');
  const outLength=outBus.hi-outBus.lo+terminals.filter(p=>p.net==='out').reduce((s,p)=>s+Math.abs(p.col-p.x)+Math.abs(p.y-p.row),0);
  const schematicLayer=group(scenes);
  const renderSchematic=makeSchematic(schematicLayer);
  const physicalScenes=group(scenes);
  const chip=group(physicalScenes), base=group(chip);
  path(base,'M0 176h260l5 7H5Z M260 0l5 7v176l-5-7Z',{fill:'#bbc8c3',stroke:'#727f79'});
  rect(base,0,0,260,176,{rx:3,fill:'#e7eeea',stroke:'#83938b','stroke-width':1.5});
  rect(base,3,3,254,170,{fill:'url(#ai-wafer)'});
  rect(base,20,23,220,42,{rx:2,fill:'#eee6d7',stroke:'#ad987c','stroke-width':.8});
  const ring=path(base,'M20 71H240V155H20Z',{stroke:'#9ca996','stroke-width':6,'stroke-linejoin':'miter'});
  path(base,ring.getAttribute('d'),{stroke:'#596959','stroke-dasharray':'1 5','stroke-width':2});
  for(const [x,y] of [[224,45],[20,139]]) {
    rect(base,x-4,y-4,8,8,{fill:'#a7b39b',stroke:'#5a7468'});rect(base,x-2,y-2,4,4,{fill:'#47594d'});
  }
  const centreLine=path(base,'M130 69v52',{stroke:'#808f88','stroke-width':1,'stroke-dasharray':'3 4'});
  const flyLines=group(base);
  // Unrouted guide lines follow the moving pins until placement locks.
  const guidePairs=[[0,2,2,2],[2,0,6,2],[3,0,6,2],[4,0,6,2],[5,0,6,2],
                    [1,2,3,2],[1,2,4,2],[0,1,1,1],[2,1,5,1],[3,1,4,1]];
  const guides=guidePairs.map(()=>path(flyLines,'',{stroke:'#798e81','stroke-width':.8,'stroke-dasharray':'3 3'}));
  const ghosts=group(base);
  const modules=devices.map(cell=>{
    rect(ghosts,cell.x-16,cell.y-14,32,26,{rx:2,fill:'none',stroke:cell.color,'stroke-dasharray':'2 3'});
    const g=group(base,{'data-device':cell.name});
    rect(g,-16,-13,32,26,{rx:1,fill:'#fcfcf7',stroke:cell.color,'stroke-width':1.05});
    rect(g,-14,-7,28,14,{fill:cell.color,opacity:.58});
    rect(g,-2.5,-13,5,25,{fill:'#bd8a70',stroke:'#805c49','stroke-width':.5});
    for(const x of [-11,11]){
      rect(g,x-3.3,-5.5,6.6,11,{fill:'#d5dace',stroke:'#687269','stroke-width':.8});
      for(const y of [-2.5,2.5]) rect(g,x-1.25,y-1.2,2.5,2.4,{fill:'#58685c'});
    }
    rect(g,-2,-14,4,4,{fill:'#605b50'});
    return g;
  });
  const films=[], risers=[], metal=[];
  const colors=['#a66943','#537a9c','#187c6b'];
  function strokeRun(layer,d,color,width) {
    return path(layer,d,{stroke:color,'stroke-width':width,pathLength:1,'stroke-dasharray':'1 1'});
  }
  for(let level=0;level<3;level++){
    const links=group(chip), plane=group(chip), film=group(plane);
    rect(film,5,5,250,166,{rx:2,fill:colors[level],'fill-opacity':.045,stroke:colors[level],'stroke-width':.85,'stroke-opacity':.4});
    path(film,'M6 13V6h9m231 0h8v7m0 149v8h-9M14 170H6v-8',{stroke:colors[level],'stroke-width':1.6});
    films.push({plane,film,links});
    const pins=terminals.map(p=>({x:level===0?p.x:p.col,y:level===2?p.row:p.y,net:p.net}));
    risers.push(pins.map(pin=>{
      const node=group(links);
      const side=path(node,'',{stroke:colors[level],'stroke-width':3});
      const centre=path(node,'',{stroke:'#f4f2e8','stroke-width':.8});
      const pad=rect(plane,pin.x-2.1,pin.y-2.1,4.2,4.2,{fill:colors[level],stroke:'#65716b','stroke-width':.5});
      return {pin,node,side,centre,pad};
    }));
    const routes=level===2 ? m3.map(b=>({net:b.net,x:b.lo,y:b.y,ex:b.hi,ey:b.y})) :
      terminals.map(p=>({net:p.net,x:level===0?p.x:p.col,y:p.y,ex:p.col,ey:level===0?p.y:p.row}));
    metal.push(routes.map(r=>{
      const d='M'+r.x+' '+r.y+'L'+r.ex+' '+r.ey;
      return {...r,node:strokeRun(plane,d,colors[level],[2.8,2.4,3.2][level]),
              tip:r.net==='out'?circle(plane,r.x,r.y,2.3,{fill:'#402f22'}):null};
    }));
    if(level===2) m3.filter(b=>b.pad!==null).forEach(b=>rect(plane,b.pad-3.5,b.y-3.5,7,7,{fill:'#e0e9d7',stroke:colors[2]}));
  }
  const verify=group(physicalScenes);
  const scan=group(verify);
  rect(scan,-7,11,7,153,{fill:'#5eaf95','fill-opacity':.12});
  path(scan,'M0 11v153',{stroke:'#278773','stroke-width':1.6});
  const clearance=group(verify);
  const readout=group(clearance);
  circle(readout,499,55,34,{fill:'#f6f7f3',stroke:'#889a8a','stroke-width':1.25});
  const zoom=3.2, edge=exampleSpacing.separation*zoom/2;
  for(const side of [-1,1]) rect(readout,499+side*edge-(side<0?2.4*zoom:0),33,2.4*zoom,44,{rx:1,fill:'#537a9c'});
  path(readout,'M'+(499-edge)+' 54h'+(edge*2)+'m-'+(edge*2-2.5)+' -2.5-2.5 2.5 2.5 2.5M'+(499+edge-2.5)+' 51.5l2.5 2.5-2.5 2.5',{stroke:'#8c562e','stroke-width':1.05});
  const lensLead=path(clearance,'',{stroke:'#977757','stroke-width':1,'stroke-dasharray':'3 3'});
  const lensSpot=circle(clearance,0,0,6,{fill:'none',stroke:'#87592e','stroke-width':1.5});
  const matchBoard=group(verify);
  rect(matchBoard,382,91,147,137,{rx:9,fill:'#f6f7f3',stroke:'#8d9a93'});
  const miniature=group(matchBoard,{transform:'translate(553 100) scale(-.333 .345)'});
  makeSchematic(miniature,{testbench:false})(1);
  const matchedNet=path(miniature,'M368 109v45m0-27h139',{stroke:'#228672','stroke-width':5});
  const proof=group(matchBoard);
  circle(proof,511,211,9,{fill:'#e0f0e7',stroke:'#438577'});
  path(proof,'m507 211 3 3 5-6',{stroke:'#25715d','stroke-width':1.7});
  const probe=path(verify,'',{stroke:'#438577','stroke-width':1.5,'stroke-dasharray':'4 4'});
  const extract=group(physicalScenes);
  const parasitics=group(extract);
  const extractionProbe=path(parasitics,'',{stroke:'#986d4c','stroke-dasharray':'3 4','stroke-width':1.6});
  const rcOverlay=strokeRun(parasitics,'M114 225v16h22l4-6 6 12 6-12 6 12 6-12 4 6h61m-35 0v17m-9 0h18m-18 5h18m-9 1v12m-9 0h18m-15 4h12m-9 4h6','#97623c',2.1);
  path(parasitics,'M229 241h14q5 0 7-4l43-83q2-5 7-5h18',{stroke:'#758980','stroke-width':1.5,'stroke-dasharray':'3 4'});
  circle(parasitics,194,241,3,{fill:'#9b653e'});
  const scope=group(extract);
  const renderScope=makeScope(scope,{routeCapRatio:outLength*.0012});

  function renderLayout(t){
    const angled=smooth(progress(t,11.2,14)), compare=smooth(progress(t,26.0,27.5)), extracted=smooth(progress(t,29.5,31.4));
    const inset=mix(compare*.36,.52,extracted);
    const scale=1-inset, a=mix(1.47,1.38,angled)*scale, b=.32*angled*scale, c=-.68*angled*scale, d=mix(1.47,.69,angled)*scale;
    const cx=mix(mix(300,206,compare),162,extracted), cy=mix(mix(166,204,angled),173,Math.max(compare,extracted));
    const m=[a,b,c,d,cx-130*a-88*c,cy-130*b-88*d];
    const explode=smooth(progress(t,13.0,16.4))*(1-.89*smooth(progress(t,22.6,24.4)));
    const lift=[6,11,16].map((v,i)=>(v+[9,32,60][i]*explode)*angled*scale);
    projected(base,m);
    opacity(ghosts,(1-progress(t,10.7,11.5))*.65);opacity(centreLine,(1-progress(t,11.2,12))*.8);
    const moving=devices.map((cell,i)=>{
      const start=6.3+i*.28, f=smooth(progress(t,start,start+2.4)), e=1-f;
      const dx=cell.from[0]*e,dy=cell.from[1]*e-7*Math.sin(f*Math.PI);
      const angle=(i%2?1:-1)*12*e;
      modules[i].setAttribute('transform','translate('+(cell.x+dx)+' '+(cell.y+dy)+') rotate('+angle+')');
      return [cell.x+dx,cell.y+dy,angle*Math.PI/180];
    });
    opacity(flyLines,.58*(1-progress(t,10.9,12.3)));
    if(t<12.3){
      const pinAt=(i,k)=>{
        const [cx,cy,rot]=moving[i], dx=[-11,0,11][k],dy=k===1?-12:0;
        return [cx+dx*Math.cos(rot)-dy*Math.sin(rot),cy+dx*Math.sin(rot)+dy*Math.cos(rot)].join(' ');
      };
      guidePairs.forEach(([a,k,b,j],i)=>guides[i].setAttribute('d','M'+pinAt(a,k)+'L'+pinAt(b,j)));
    }
    for(let level=0;level<3;level++){
      const start=[12.5,15.8,19.4][level];
      const active=progress(t,start-.4,start+.2);
      const {plane,film,links}=films[level];
      projected(plane,shifted(m,lift[level]));
      opacity(plane,active);opacity(links,active);
      opacity(film,mix(.1,.85,explode));
      risers[level].forEach(({pin,node,side,centre,pad},i)=>{
        const p=progress(t,start+i*.014,start+.7+i*.014);
        const x=a*pin.x+c*pin.y+m[4], y=b*pin.x+d*pin.y+m[5];
        const low=y-(level===0?0:lift[level-1]),high=y-lift[level];
        const line='M'+x+' '+low+'V'+mix(low,high,p);
        for(const edge of [side,centre]) edge.setAttribute('d',line);
        opacity(node,p);opacity(pad,p);
      });
      metal[level].forEach(({net,node,tip,x,y,ex,ey},i)=>{
        const order=i/(metal[level].length-1);
        const draw=progress(t,start+.55+order*1.05,start+1.7+order*1.05);
        node.setAttribute('stroke-dashoffset',1-draw);
        const focus=smooth(progress(t,26.5,27.8));
        opacity(node,draw===0?0:net==='out'?1:1-focus*.65);
        if(tip){tip.setAttribute('cx',mix(x,ex,draw));tip.setAttribute('cy',mix(y,ey,draw));opacity(tip,Math.sin(draw*Math.PI));}
      });
    }
    opacity(verify,progress(t,24,24.6)*(1-progress(t,29.4,30.4)));
    const sweep=progress(t,24.1,25.95);
    projected(scan,[a,b,c,d,m[4]+a*(15+230*sweep),m[5]+b*(15+230*sweep)-lift[1]]);
    opacity(scan,1-progress(t,25.95,26.48));
    // Check spacing between adjacent M2 columns, then compare the reconstructed OUT net.
    const {p,q,lo,hi}=exampleSpacing, wx=(p.col+q.col)/2, wy=mix(lo+2,hi-2,progress(t,24.5,25.9));
    const spotX=a*wx+c*wy+m[4],spotY=b*wx+d*wy+m[5]-lift[1];
    lensSpot.setAttribute('cx',spotX);lensSpot.setAttribute('cy',spotY);
    lensLead.setAttribute('d','M'+spotX+' '+spotY+'L473 76');
    opacity(clearance,drcPass?1-progress(t,26.1,26.6):0);
    const match=progress(t,26.3,27.3);
    opacity(matchBoard,match);opacity(proof,connected?progress(t,28.2,28.8):0);
    const px=a*outBus.pad+c*outBus.y+m[4], py=b*outBus.pad+d*outBus.y+m[5]-lift[2];
    probe.setAttribute('d','M'+px+' '+py+'C'+(px+30)+' '+py+' 349 144 384 144');
    opacity(probe,match);opacity(matchedNet,progress(t,27,28.2));
    opacity(extract,progress(t,30.0,31.4));
    opacity(parasitics,progress(t,30.4,32));
    extractionProbe.setAttribute('d','M'+px+' '+py+'L'+(px+10)+' '+(py+10)+'L114 225');
    rcOverlay.setAttribute('stroke-dashoffset',1-progress(t,30.9,32.5));
    renderScope(progress(t,31.5,39));
  }

  const motionSwitch=root.querySelector('.motion-switch');
  const duration=40, reduce=matchMedia('(prefers-reduced-motion: reduce)');
  let t=reduce.matches?21.9:0, playing=false, frame=0, previous=0, onScreen=true;
  function render(){
    const phys=progress(t,5.4,6.4);
    const restart=playing?smooth(progress(t,duration-.8,duration)):0;
    opacity(physicalScenes,1-restart);
    opacity(schematicLayer,Math.max(1-phys,restart));opacity(chip,phys);
    if(phys<1 || restart>0) renderSchematic(restart>0?0:progress(t,0,5.3));
    if(phys>0) renderLayout(t);
    else { opacity(verify,0);opacity(extract,0); }
  }
  function syncClock(){
    cancelAnimationFrame(frame); previous=0;
    if(playing && onScreen && !document.hidden) frame=requestAnimationFrame(tick);
  }
  function toggle(run){
    playing=run;
    motionSwitch.setAttribute('aria-checked',String(run));
    motionSwitch.title=run?'Turn animation off':'Turn animation on';
    syncClock();
  }
  function tick(now){
    // The small illustration needs only 30 frames per second.
    if(!previous || now-previous>=1000/30){
      if(previous) t=(t+(now-previous)/1000)%duration;
      previous=now;render();
    }
    frame=requestAnimationFrame(tick);
  }
  motionSwitch.addEventListener('click',()=>toggle(!playing));
  document.addEventListener('visibilitychange',syncClock);
  new IntersectionObserver(([entry])=>{
    onScreen=entry.isIntersecting;
    syncClock();
  }).observe(root.querySelector('figure'));
  reduce.addEventListener('change',()=>{if(reduce.matches) toggle(false);});
  render();toggle(!reduce.matches);
})();
