import{_ as s,c as a,o as i,a2 as t}from"./chunks/framework.C94oF1kp.js";const g=JSON.parse('{"title":"提取请求路径参数类型","description":"","frontmatter":{},"headers":[],"relativePath":"pro/extract-request-query-json.md","filePath":"pro/extract-request-query-json.md"}'),e={name:"pro/extract-request-query-json.md"},n=t(`<h1 id="提取请求路径参数类型" tabindex="-1">提取请求路径参数类型 <a class="header-anchor" href="#提取请求路径参数类型" aria-label="Permalink to &quot;提取请求路径参数类型&quot;">​</a></h1><h2 id="extractparamquery" tabindex="-1">ExtractParamQuery <a class="header-anchor" href="#extractparamquery" aria-label="Permalink to &quot;ExtractParamQuery&quot;">​</a></h2><h3 id="用法" tabindex="-1">用法 <a class="header-anchor" href="#用法" aria-label="Permalink to &quot;用法&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { ExtractParamQuery } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;api-typing&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 通过请求方式和 url 提取请求路径的参数类型</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 假设原url为 /v1/cat?pageNo=1&amp;pageSize=10, 请求方式为 get</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 则提取到的请求路径参数类型为 { pageNo: string, pageSize: string }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> requestQuery</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ExtractParamQuery</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;get&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/v1/cat&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {}</span></span></code></pre></div>`,4),r=[n];function h(p,l,k,o,c,d){return i(),a("div",null,r)}const y=s(e,[["render",h]]);export{g as __pageData,y as default};
