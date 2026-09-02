---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

# ✨ About me

I am currently a Ph.D. candidate in Computer Science and Engineering at [The Chinese University of Hong Kong (CUHK)](https://www.cuhk.edu.hk/), starting Fall 2025, under the supervision of [Prof. Tsung-Yi Ho](https://tsungyiho.github.io/), with additional guidance from [Prof. Bei Yu](https://www.cse.cuhk.edu.hk/~byu/). 
<!-- Her research focuses on [briefly state your research area, e.g., "computer-aided design for integrated circuits" or "algorithmic optimization in electronic design automation"]. -->
Prior to joining CUHK, I obtained my M.S. degree in Integrated Circuit Science and Engineering from [Beihang University (BUAA)](https://ev.buaa.edu.cn/), where I conducted research under the guidance of [Prof. Wei Xing](https://wxing.me/) and [Prof. Yue Zhang](https://shi.buaa.edu.cn/yuezhang/zh_CN/index.htm).

<div style="margin-top: 10px;">
  <a href="/cv/Yanfang_CV.pdf" style="text-decoration: none;">
    <button style="background-color: #333333; color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer; font-size: 14px;">
      📄 Download CV
    </button>
  </a>
</div>

<!-- ## Interests  
- **Artificial Intelligence**  
- **Electronic Design Automation**  
- **Rare Event Analysis**  

## Education  
- **PhD Computer Science and Engineering**  
  *Stanford University*  
- **MEng Electronic Information**  
  *Beihang University*  
- **BSc Artificial Intelligence**  
  *University of Jinan* -->

  <div style="margin-top: 20px;">
    <h2>🔮 Research Interests</h2>
    <ul>
      <li><strong>Electronic Design Automation (EDA)</strong></li>
      <li><strong>Design Space Exploration (DSE)</strong></li>
      <li><strong>Statistical Machine Learning</strong></li>
    </ul>
  </div>



# 🔥 News

<div class="news-scroll" role="region" aria-label="News archive" tabindex="0" markdown="1">

- *2026.08*: &nbsp;🎉 MigSizer has been accepted by ICCD 2026!
- *2026.07*: &nbsp;🎉 LibPilot has been accepted by ICCAD 2026!
- *2026.05*: &nbsp;🎉 AnalogVerifier has been accepted by ICML 2026!
- *2024.12*: &nbsp;✨ I am featured on the official WeChat account and website of Beihang University. \| [\[link\]](https://mp.weixin.qq.com/s/4kUMKpGHEHNJaZBFygPZHg?poc_token=HGIgYGejn2QyL_yhaQsKoPnvQ8MGGd5rElbb86UB)
- *2024.11*: &nbsp;🎉 FUSIS paper has been accepted by DATE 2025!
- *2024.09*: &nbsp;🎯 I will pursue a PhD in Computer Science and Engineering (CSE) at CUHK in August next year!
- *2024.06*: &nbsp;🎉 VIS has been accepted by ICCAD 2024!
- *2024.02*: &nbsp;🎉 EFAIL has been accepted by DAC 2024!
- *2023.09*: &nbsp;🎉 CIS has been accepted by ASP-DAC 2024!
- *2023.11*: &nbsp;🎉✨ OPT received the Best Paper Nomination Award🏆!
- *2023.07*: &nbsp;🎉 OPT has been accepted by ICCAD 2023!
- *2023.02*: &nbsp;🎉 OPTIMIS has been accepted by DAC 2023!

</div>


# 📝 Publications 

<p><strong>Note:</strong>
<span style="background-color:#ea8ac8; color:#ffffff; padding:0px 5px; border-radius:3px; font-size:11px; font-weight:700; font-family:'Arial Rounded MT Bold', 'Helvetica Neue', Arial, sans-serif;">CCF-A</span>
<span style="background-color:#5fa8e6; color:#ffffff; padding:0px 5px; border-radius:3px; font-size:11px; font-weight:700; font-family:'Arial Rounded MT Bold', 'Helvetica Neue', Arial, sans-serif;">CCF-B</span>
<span style="background-color:#a8d63a; color:#ffffff; padding:0px 5px; border-radius:3px; font-size:11px; font-weight:700; font-family:'Arial Rounded MT Bold', 'Helvetica Neue', Arial, sans-serif;">CCF-C</span>
</p>

<style>
  .news-scroll {
    max-height: 14.5rem;
    margin: 0.35rem 0 1.35rem;
    padding: 0.65rem 0.95rem 0.55rem 1.1rem;
    font-size: 0.9em;
    overflow-y: scroll;
    overscroll-behavior-y: contain;
    scrollbar-gutter: stable;
    scrollbar-width: thin;
    scrollbar-color: #707070 #e8e8e8;
    border: 1px solid rgba(0, 0, 0, 0.14);
    border-left: 3px solid #555555;
    border-radius: 12px;
    background: linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  }

  .news-scroll ul {
    margin: 0;
    padding-left: 1.25rem;
  }

  .news-scroll li {
    margin: 0;
    padding: 0.35rem 0.15rem 0.5rem;
    line-height: 1.45;
  }

  .news-scroll li + li {
    border-top: 1px solid rgba(0, 0, 0, 0.08);
  }

  .news-scroll li::marker {
    color: #555555;
  }

  .news-scroll a,
  .news-scroll a:visited {
    color: #404040;
    text-decoration-color: #909090;
  }

  .news-scroll a:hover,
  .news-scroll a:focus {
    color: #111111;
    text-decoration-color: #111111;
  }

  .news-scroll:focus-visible {
    outline: 2px solid #4a4a4a;
    outline-offset: 3px;
  }

  .news-scroll::-webkit-scrollbar {
    width: 9px;
  }

  .news-scroll::-webkit-scrollbar-track {
    margin: 8px 0;
    border-radius: 999px;
    background: #e8e8e8;
  }

  .news-scroll::-webkit-scrollbar-thumb {
    min-height: 36px;
    border: 2px solid #e8e8e8;
    border-radius: 999px;
    background: linear-gradient(180deg, #a0a0a0 0%, #666666 100%);
  }

  .news-scroll::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #858585 0%, #444444 100%);
  }

  .publication-filter {
    display: inline-flex;
    gap: 4px;
    margin: 0.15rem 0 0.25rem;
    padding: 3px;
    border: 1px solid rgba(36, 113, 210, 0.18);
    border-radius: 999px;
    background: linear-gradient(135deg, #f7faff 0%, #edf5ff 100%);
    box-shadow: 0 5px 16px rgba(32, 92, 160, 0.12);
  }

  .publication-filter-button {
    min-width: 104px;
    padding: 6px 17px;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: #48647f;
    cursor: pointer;
    font: inherit;
    font-size: 0.9em;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: 0.01em;
    transition: color 160ms ease, background 160ms ease, box-shadow 160ms ease, transform 160ms ease;
  }

  .publication-filter-button:hover,
  .publication-filter-button:focus-visible {
    background: rgba(255, 255, 255, 0.78);
    color: #1168c7;
  }

  .publication-filter-button[aria-pressed="true"] {
    background: linear-gradient(135deg, #1e88e5 0%, #466fe5 100%);
    color: #ffffff;
    box-shadow: 0 4px 10px rgba(34, 105, 202, 0.3);
  }

  .publication-filter-button:active {
    transform: scale(0.97);
  }

  .publication-filter-button:focus-visible {
    outline: 2px solid #1559a6;
    outline-offset: 2px;
  }

  .publication-filter + h3 {
    margin-top: 0.6rem;
  }

  @media (max-width: 480px) {
    .news-scroll {
      max-height: 13rem;
      padding: 0.55rem 0.7rem 0.45rem 0.85rem;
    }

    .publication-filter-button {
      min-width: 94px;
      padding: 6px 14px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .publication-filter-button {
      transition: none;
    }
  }
</style>

<div class="publication-filter" role="group" aria-label="Filter publications">
  <button type="button" class="publication-filter-button" data-publication-filter="selected" aria-pressed="true" aria-controls="latest-full-publications selected-publications additional-publications">Selected</button>
  <button type="button" class="publication-filter-button" data-publication-filter="full" aria-pressed="false" aria-controls="latest-full-publications selected-publications additional-publications">Full</button>
</div>

### Conference Paper

<!-- <div class='paper-box'><div class='paper-box-image'><div><div class="badge">CVPR 2016</div><img src='images/500x300.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[Deep Residual Learning for Image Recognition](https://openaccess.thecvf.com/content_cvpr_2016/papers/He_Deep_Residual_Learning_CVPR_2016_paper.pdf)

**Kaiming He**, Xiangyu Zhang, Shaoqing Ren, Jian Sun

[**Project**](https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=DhtAFkwAAAAJ&citation_for_view=DhtAFkwAAAAJ:ALROH1vI_8AC) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong>
- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
</div>
</div> -->

<div id="latest-full-publications" class="publication-list" markdown="1" hidden>

- [C10] <span style="background-color:#a8d63a; color: #ffffff; padding: 0px 5px; border-radius: 3px; font-size: 1em; font-weight: 700; font-family: 'Arial Rounded MT Bold', 'Helvetica Neue', Arial, sans-serif; line-height: 1.2;">ASP-DAC 2027</span> Zhongru Xiong, Mingjun Wang, **<u>Yanfang Liu</u>**, Tsung-Yi Ho, Bei Yu, Binwu Zhu. HOIST: A High-Order Interaction Surrogate for Sample-Efficient High-Sigma Yield Estimation in High-Dimensional Circuits, IEEE/ACM Asia and South Pacific Design Automation Conference (ASP-DAC), Tokyo, Japan, Jan. 25–28, 2027.

</div>

<div id="selected-publications" class="publication-list" markdown="1">

- [C9] <span style="background-color:#5fa8e6; color: #ffffff; padding: 0px 5px; border-radius: 3px; font-size: 1em; font-weight: 700; font-family: 'Arial Rounded MT Bold', 'Helvetica Neue', Arial, sans-serif; line-height: 1.2;">ICCD 2026</span> **<u>Yanfang Liu</u>**, Peng Xu, Yapeng Li, Mingjun Wang, Leilei Jin, Rongliang Fu, Tinghuan Chen, Wei Xing, Bei Yu, Tsung-Yi Ho. MigSizer: Physical-aware Sizing Improving Analog/RF Circuit Migration. International Conference on Computer Design (ICCD), Hong Kong, Nov. 16–18, 2026.

- [C8] <span style="background-color:#5fa8e6; color: #ffffff; padding: 0px 5px; border-radius: 3px; font-size: 1em; font-weight: 700; font-family: 'Arial Rounded MT Bold', 'Helvetica Neue', Arial, sans-serif; line-height: 1.2;">ICCAD 2026</span> **<u>Yanfang Liu</u>**, Zijin Cheng, Mingjun Wang, Rongliang Fu, Chao Wang, Bei Yu. LibPilot: Knowledge-Constrained Dual-Agent Reasoning for Standard Cell Library Tuning, International Conference on Computer Aided Design (ICCAD), San Jose, California, USA, Nov. 8–12, 2026. <a href="_pages/paper/ICCAD2026.pdf" style="text-decoration: none;"><button style="border: 1px solid #007BFF; color: #007BFF; background-color: white; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-size: 12px;" onmouseover="this.style.backgroundColor='#007BFF'; this.style.color='white';" onmouseout="this.style.backgroundColor='white'; this.style.color='#007BFF';">Paper</button></a>

- [C7] <span style="background-color:#ea8ac8; color: #ffffff; padding: 0px 5px; border-radius: 3px; font-size: 1em; font-weight: 700; font-family: 'Arial Rounded MT Bold', 'Helvetica Neue', Arial, sans-serif; line-height: 1.2;">ICML 2026</span> **<u>Yanfang Liu</u>**, Mingjun Wang, Peng Xu, Rongliang Fu, Bei Yu, Tsung-Yi Ho. [AnalogVerifier: A Neuro-Symbolic Framework for Analog Circuit Verification](https://icml.cc/virtual/2026/poster/62139), International Conference on Machine Learning (ICML), Seoul, Jul. 6–11, 2026. <a href="_pages/paper/ICML2026.pdf" style="text-decoration: none;"><button style="border: 1px solid #007BFF; color: #007BFF; background-color: white; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-size: 12px;" onmouseover="this.style.backgroundColor='#007BFF'; this.style.color='white';" onmouseout="this.style.backgroundColor='white'; this.style.color='#007BFF';">Paper</button></a> <a href="_pages/paper/ICML2026Poster.pdf" style="text-decoration: none;"><button style="border: 1px solid #007BFF; color: #007BFF; background-color: white; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-size: 12px;" onmouseover="this.style.backgroundColor='#007BFF'; this.style.color='white';" onmouseout="this.style.backgroundColor='white'; this.style.color='#007BFF';">Poster</button></a>

- [C6] <span style="background-color:#5fa8e6; color: #ffffff; padding: 0px 5px; border-radius: 3px; font-size: 1em; font-weight: 700; font-family: 'Arial Rounded MT Bold', 'Helvetica Neue', Arial, sans-serif; line-height: 1.2;">DATE 2025</span> **<u>Yanfang Liu</u>**, Wei W. Xing. [FUSIS: Fusing Surrogate Models and Importance Sampling for Efficient Yield Estimation](https://ieeexplore.ieee.org/abstract/document/10993100), 2025 Design, Automation & Test in Europe Conference (DATE), Lyon, France, 2025. <a href="_pages/paper/DATE2025.pdf" style="text-decoration: none;"><button style="border: 1px solid #007BFF; color: #007BFF; background-color: white; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-size: 12px;" onmouseover="this.style.backgroundColor='#007BFF'; this.style.color='white';" onmouseout="this.style.backgroundColor='white'; this.style.color='#007BFF';">Paper</button></a> <a href="_pages/paper/DATE2025.bib" style="text-decoration: none;"><button style="border: 1px solid #007BFF; color: #007BFF; background-color: white; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-size: 12px;" onmouseover="this.style.backgroundColor='#007BFF'; this.style.color='white';" onmouseout="this.style.backgroundColor='white'; this.style.color='#007BFF';">Cite</button></a> <a href="https://youtu.be/6DrQbjT2kXI" style="text-decoration: none;"><button style="border: 1px solid #007BFF; color: #007BFF; background-color: white; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-size: 12px;" onmouseover="this.style.backgroundColor='#007BFF'; this.style.color='white';" onmouseout="this.style.backgroundColor='white'; this.style.color='#007BFF';">Video</button></a>

- [C5] <span style="background-color:#5fa8e6; color: #ffffff; padding: 0px 5px; border-radius: 3px; font-size: 1em; font-weight: 700; font-family: 'Arial Rounded MT Bold', 'Helvetica Neue', Arial, sans-serif; line-height: 1.2;">ICCAD 2024</span> **<u>Yanfang Liu</u>**, Lei He, Wei W. Xing. [Beyond the Yield Barrier: Variational Importance Sampling Yield Analysis](https://dl.acm.org/doi/abs/10.1145/3676536.3676672), 2024 43rd IEEE/ACM International Conference on Computer-Aided Design (ICCAD), New York, NY, USA. <a href="_pages/paper/ICCAD2024.pdf" style="text-decoration: none;"><button style="border: 1px solid #007BFF; color: #007BFF; background-color: white; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-size: 12px;" onmouseover="this.style.backgroundColor='#007BFF'; this.style.color='white';" onmouseout="this.style.backgroundColor='white'; this.style.color='#007BFF';">Paper</button></a> <a href="_pages/paper/ICCAD2024.bib" style="text-decoration: none;"><button style="border: 1px solid #007BFF; color: #007BFF; background-color: white; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-size: 12px;" onmouseover="this.style.backgroundColor='#007BFF'; this.style.color='white';" onmouseout="this.style.backgroundColor='white'; this.style.color='#007BFF';">Cite</button></a>

- [C4] <span style="background-color:#a8d63a; color: #ffffff; padding: 0px 5px; border-radius: 3px; font-size: 1em; font-weight: 700; font-family: 'Arial Rounded MT Bold', 'Helvetica Neue', Arial, sans-serif; line-height: 1.2;">ASP-DAC 2024</span> **<u>Yanfang Liu</u>**, Wei W. Xing. [CIS: Conditional Importance Sampling for Yield Optimization of Analog and SRAM Circuits](https://ieeexplore.ieee.org/abstract/document/10473819), 2024 29th Asia and South Pacific Design Automation Conference (ASP-DAC), Incheon, Korea, Republic of, 2024. <a href="_pages/paper/ASP-DAC2024.pdf" style="text-decoration: none;"><button style="border: 1px solid #007BFF; color: #007BFF; background-color: white; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-size: 12px;" onmouseover="this.style.backgroundColor='#007BFF'; this.style.color='white';" onmouseout="this.style.backgroundColor='white'; this.style.color='#007BFF';">Paper</button></a> <a href="_pages/paper/ASP-DAC2024.bib" style="text-decoration: none;"><button style="border: 1px solid #007BFF; color: #007BFF; background-color: white; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-size: 12px;" onmouseover="this.style.backgroundColor='#007BFF'; this.style.color='white';" onmouseout="this.style.backgroundColor='white'; this.style.color='#007BFF';">Cite</button></a>

- [C3] <span style="background-color:#5fa8e6; color: #ffffff; padding: 0px 5px; border-radius: 3px; font-size: 1em; font-weight: 700; font-family: 'Arial Rounded MT Bold', 'Helvetica Neue', Arial, sans-serif; line-height: 1.2;">ICCAD 2023</span> <span style="background-color:#d9534f; color:#ffffff; padding:0px 5px; border-radius:3px; font-size:1em; font-weight:700; font-family:'Arial Rounded MT Bold', 'Helvetica Neue', Arial, sans-serif; line-height:1.2;">BPN Award🏆</span> **<u>Yanfang Liu</u>**, Guohao Dai, Yuanqing Cheng, Wang Kang, Wei W. Xing. [OPT: Optimal Proposal Transfer for Efficient Yield Optimization for Analog and SRAM Circuits](https://ieeexplore.ieee.org/abstract/document/10323689), 2023 IEEE/ACM International Conference on Computer Aided Design (ICCAD), San Francisco, CA, USA, 2023. <a href="_pages/paper/ICCAD2023.pdf" style="text-decoration: none;"><button style="border: 1px solid #007BFF; color: #007BFF; background-color: white; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-size: 12px;" onmouseover="this.style.backgroundColor='#007BFF'; this.style.color='white';" onmouseout="this.style.backgroundColor='white'; this.style.color='#007BFF';">Paper</button></a> <a href="_pages/paper/ICCAD2023.bib" style="text-decoration: none;"><button style="border: 1px solid #007BFF; color: #007BFF; background-color: white; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-size: 12px;" onmouseover="this.style.backgroundColor='#007BFF'; this.style.color='white';" onmouseout="this.style.backgroundColor='white'; this.style.color='#007BFF';">Cite</button></a> <a href="https://youtu.be/EQ50eG3W36Y" style="text-decoration: none;"><button style="border: 1px solid #007BFF; color: #007BFF; background-color: white; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-size: 12px;" onmouseover="this.style.backgroundColor='#007BFF'; this.style.color='white';" onmouseout="this.style.backgroundColor='white'; this.style.color='#007BFF';">Video</button></a>

- [C2] <span style="background-color:#ea8ac8; color: #ffffff; padding: 0px 5px; border-radius: 3px; font-size: 1em; font-weight: 700; font-family: 'Arial Rounded MT Bold', 'Helvetica Neue', Arial, sans-serif; line-height: 1.2;">DAC 2023</span> **<u>Yanfang Liu</u>**, Guohao Dai, Wei W. Xing. [Seeking the yield barrier: High-dimensional sram evaluation through optimal manifold](https://ieeexplore.ieee.org/abstract/document/10247952), 2023 60th ACM/IEEE Design Automation Conference (DAC), San Francisco, CA, USA, 2023. <a href="_pages/paper/DAC2023.pdf" style="text-decoration: none;"><button style="border: 1px solid #007BFF; color: #007BFF; background-color: white; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-size: 12px;" onmouseover="this.style.backgroundColor='#007BFF'; this.style.color='white';" onmouseout="this.style.backgroundColor='white'; this.style.color='#007BFF';">Paper</button></a> <a href="_pages/paper/DAC2023.bib" style="text-decoration: none;"><button style="border: 1px solid #007BFF; color: #007BFF; background-color: white; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-size: 12px;" onmouseover="this.style.backgroundColor='#007BFF'; this.style.color='white';" onmouseout="this.style.backgroundColor='white'; this.style.color='#007BFF';">Cite</button></a> <a href="https://youtu.be/58vpAHg66Lc" style="text-decoration: none;"><button style="border: 1px solid #007BFF; color: #007BFF; background-color: white; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-size: 12px;" onmouseover="this.style.backgroundColor='#007BFF'; this.style.color='white';" onmouseout="this.style.backgroundColor='white'; this.style.color='#007BFF';">Video</button></a>

</div>

<div id="additional-publications" class="publication-list" markdown="1" hidden>

- [C1] <span style="background-color:#ea8ac8; color: #ffffff; padding: 0px 5px; border-radius: 3px; font-size: 1em; font-weight: 700; font-family: 'Arial Rounded MT Bold', 'Helvetica Neue', Arial, sans-serif; line-height: 1.2;">DAC 2024</span> Wei W. Xing, **<u>Yanfang Liu</u>**, Weijian Fan, Lei He. [Every Failure Is A Lesson: Utilizing All Failure Samples To Deliver Tuning-Free Efficient Yield Evaluation](https://dl.acm.org/doi/abs/10.1145/3649329.3657381), 2024 61st ACM/IEEE Design Automation Conference (DAC). New York, NY, USA, 2024. <a href="_pages/paper/DAC2024.pdf" style="text-decoration: none;"><button style="border: 1px solid #007BFF; color: #007BFF; background-color: white; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-size: 12px;" onmouseover="this.style.backgroundColor='#007BFF'; this.style.color='white';" onmouseout="this.style.backgroundColor='white'; this.style.color='#007BFF';">Paper</button></a> <a href="_pages/paper/DAC2024.bib" style="text-decoration: none;"><button style="border: 1px solid #007BFF; color: #007BFF; background-color: white; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-size: 12px;" onmouseover="this.style.backgroundColor='#007BFF'; this.style.color='white';" onmouseout="this.style.backgroundColor='white'; this.style.color='#007BFF';">Cite</button></a> <a href="https://youtu.be/ZJqte7cuPhk" style="text-decoration: none;"><button style="border: 1px solid #007BFF; color: #007BFF; background-color: white; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-size: 12px;" onmouseover="this.style.backgroundColor='#007BFF'; this.style.color='white';" onmouseout="this.style.backgroundColor='white'; this.style.color='#007BFF';">Video</button></a>

</div>

<script>
  (function () {
    var buttons = document.querySelectorAll('[data-publication-filter]');
    var latestFullPublications = document.getElementById('latest-full-publications');
    var selectedPublications = document.getElementById('selected-publications');
    var additionalPublications = document.getElementById('additional-publications');

    if (!buttons.length || !latestFullPublications || !selectedPublications || !additionalPublications) return;

    function setPublicationNumbers(filter) {
      var publicationItems = Array.prototype.slice.call(
        selectedPublications.querySelectorAll('li')
      );

      if (filter === 'full') {
        publicationItems = Array.prototype.slice.call(
          latestFullPublications.querySelectorAll('li')
        ).concat(
          publicationItems,
          Array.prototype.slice.call(additionalPublications.querySelectorAll('li'))
        );
      }

      publicationItems.forEach(function (item, index) {
        var number = publicationItems.length - index;
        var numberNode;
        var numberContainer = item.querySelector('p') || item;

        Array.prototype.some.call(numberContainer.childNodes, function (node) {
          if (node.nodeType === 3 && /\[C\d+\]/.test(node.nodeValue)) {
            numberNode = node;
            return true;
          }

          return false;
        });

        if (numberNode) {
          numberNode.nodeValue = numberNode.nodeValue.replace(/\[C\d+\]/, '[C' + number + ']');
        }
      });
    }

    function setPublicationFilter(filter) {
      var showFull = filter === 'full';

      latestFullPublications.hidden = !showFull;
      additionalPublications.hidden = !showFull;
      setPublicationNumbers(filter);

      buttons.forEach(function (button) {
        button.setAttribute(
          'aria-pressed',
          button.getAttribute('data-publication-filter') === filter ? 'true' : 'false'
        );
      });
    }

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        setPublicationFilter(button.getAttribute('data-publication-filter'));
      });
    });

    setPublicationFilter('selected');
  })();
</script>

# 🎖 Selected Honors and Awards
- *2024.10* National Scholarship (Master). 
- *2023.10* National Scholarship (Master) (Top 1%). 
- *2020.10* National Scholarship (Undergraduate) (Top 1%). 
- *2024.11* Outstanding Master's Thesis Award.
- *2024.11* Beijing Outstanding Graduate.
- *2024.06* Top Ten Graduate Award (Highest Honor for Graduate Students at Beihang University).
<!-- - *2024.04* Outstanding Graduate of Beihang University. -->
<!-- - *2024.10* Beihang University Merit Student. -->
- *2024.05* Huawei Scholarship.
<!-- - *2024.11* Outstanding Master's Thesis Award. -->
<!-- - *2023.10* National Scholarship (Master) (Top 1%).  -->
<!-- - *2023.10* Beihang University Merit Student. -->
- *2022.06* Outstanding Bachelor's Thesis Award.
- *2020.12* Outstanding Student of Shandong Province.
<!-- - *2020.10* National Scholarship (Undergraduate) (Top 1%).  -->

<!-- - *2021.09* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  -->

# 🎓 Education
- <strong>PhD Computer Science and Engineering</strong><br><em>The Chinese University of Hong Kong</em>
- <strong>MEng Electronic Information</strong><br><em>Beihang University</em>
- <strong>BSc Electrical Engineering and Automation</strong><br><em>University of Jinan</em>

<!-- ## Journal Paper 👇 -->

<!-- <div style="display: flex; align-items: center;">
  <div class="badge">CVPR 2016</div>
  <div>
    <a href="https://github.com">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet
    </a>, A, B, C, <strong>CVPR 2020</strong>
  </div>
</div> -->

<!-- # 📖 Educations
- *2019.06 - 2022.04 (now)*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
- *2015.09 - 2019.06*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  -->

<!-- # 💬 
- *2021.06*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
- *2021.03*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  \| [\[video\]](https://github.com/) -->

# 💻 Experiences
### The Chinese University of Hong Kong (Shenzhen)
- *2025.02 - 2025.07*, Research Assistant, supervised by [Prof. Tinghuan Chen](https://mypage.cuhk.edu.cn/academics/chentinghuan/)

### Peer Reviewer
- *2025.05* IEEE/ACM TODAES
