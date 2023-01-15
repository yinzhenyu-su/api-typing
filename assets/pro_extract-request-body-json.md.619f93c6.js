import{_ as s,c as a,o as t,a as o}from"./app.9380381c.js";const u=JSON.parse('{"title":"提取接口请求 body 参数类型","description":"","frontmatter":{},"headers":[{"level":2,"title":"ExtractRequestBodyJSON","slug":"extractrequestbodyjson","link":"#extractrequestbodyjson","children":[{"level":3,"title":"用法","slug":"用法","link":"#用法","children":[]}]}],"relativePath":"pro/extract-request-body-json.md"}'),e={name:"pro/extract-request-body-json.md"},n=o(`<h1 id="提取接口请求-body-参数类型" tabindex="-1">提取接口请求 body 参数类型 <a class="header-anchor" href="#提取接口请求-body-参数类型" aria-hidden="true">#</a></h1><h2 id="extractrequestbodyjson" tabindex="-1">ExtractRequestBodyJSON <a class="header-anchor" href="#extractrequestbodyjson" aria-hidden="true">#</a></h2><h3 id="用法" tabindex="-1">用法 <a class="header-anchor" href="#用法" aria-hidden="true">#</a></h3><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ExtractRequestBodyJSON</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">api-typing</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 通过请求方式和url提取请求body的类型</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> requestBodyJSON</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ExtractRequestBodyJSON</span><span style="color:#89DDFF;">&lt;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">post</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/v1/cat</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span></code></pre></div>`,4),l=[n];function p(r,c,y,i,d,D){return t(),a("div",null,l)}const C=s(e,[["render",p]]);export{u as __pageData,C as default};