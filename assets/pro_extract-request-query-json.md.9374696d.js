import{_ as s,c as a,o as n,a as e}from"./app.9380381c.js";const d=JSON.parse('{"title":"提取请求路径参数类型","description":"","frontmatter":{},"headers":[{"level":2,"title":"ExtractParamQuery","slug":"extractparamquery","link":"#extractparamquery","children":[{"level":3,"title":"用法","slug":"用法","link":"#用法","children":[]}]}],"relativePath":"pro/extract-request-query-json.md"}'),t={name:"pro/extract-request-query-json.md"},l=e(`<h1 id="提取请求路径参数类型" tabindex="-1">提取请求路径参数类型 <a class="header-anchor" href="#提取请求路径参数类型" aria-hidden="true">#</a></h1><h2 id="extractparamquery" tabindex="-1">ExtractParamQuery <a class="header-anchor" href="#extractparamquery" aria-hidden="true">#</a></h2><h3 id="用法" tabindex="-1">用法 <a class="header-anchor" href="#用法" aria-hidden="true">#</a></h3><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ExtractParamQuery</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">api-typing</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 通过请求方式和 url 提取请求路径的参数类型</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 假设原url为 /v1/cat?pageNo=1&amp;pageSize=10, 请求方式为 get</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 则提取到的请求路径参数类型为 { pageNo: string, pageSize: string }</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> requestQuery</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ExtractParamQuery</span><span style="color:#89DDFF;">&lt;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">get</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/v1/cat</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span></code></pre></div>`,4),o=[l];function p(r,c,i,y,D,F){return n(),a("div",null,o)}const C=s(t,[["render",p]]);export{d as __pageData,C as default};