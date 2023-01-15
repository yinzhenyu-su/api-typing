import{_ as s,c as a,o as n,a as p}from"./app.9380381c.js";const d=JSON.parse('{"title":"快速上手","description":"","frontmatter":{},"headers":[{"level":2,"title":"安装 api-typing","slug":"安装-api-typing","link":"#安装-api-typing","children":[]},{"level":2,"title":"设置更新类型的脚本","slug":"设置更新类型的脚本","link":"#设置更新类型的脚本","children":[]},{"level":2,"title":"执行 get-types","slug":"执行-get-types","link":"#执行-get-types","children":[]},{"level":2,"title":"配置 tsconfig.json","slug":"配置-tsconfig-json","link":"#配置-tsconfig-json","children":[]},{"level":2,"title":"开始使用吧","slug":"开始使用吧","link":"#开始使用吧","children":[]}],"relativePath":"start/quick-start.md"}'),l={name:"start/quick-start.md"},o=p(`<h1 id="快速上手" tabindex="-1">快速上手 <a class="header-anchor" href="#快速上手" aria-hidden="true">#</a></h1><h2 id="安装-api-typing" tabindex="-1">安装 api-typing <a class="header-anchor" href="#安装-api-typing" aria-hidden="true">#</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">api-typing</span></span>
<span class="line"></span></code></pre></div><h2 id="设置更新类型的脚本" tabindex="-1">设置更新类型的脚本 <a class="header-anchor" href="#设置更新类型的脚本" aria-hidden="true">#</a></h2><p>在<code>package.json</code>的<code>scripts</code>字段中添加如下内容</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">get-types</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">:</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">get-types </span><span style="color:#A6ACCD;">\\&quot;</span><span style="color:#C3E88D;">https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.0/petstore-expanded.json</span><span style="color:#A6ACCD;">\\&quot;</span><span style="color:#C3E88D;"> </span><span style="color:#A6ACCD;">\\&quot;</span><span style="color:#C3E88D;">./api-typing-meta.d.ts</span><span style="color:#A6ACCD;">\\&quot;</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span></code></pre></div><p>你的<code>package.json</code>整体预览解析</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">api-typing</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">version</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">0.1.1</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">description</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Axios based HTTP client with type hint</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">scripts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">get-types</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">get-types @arg1 @arg2</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">license</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">MIT</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">dependencies</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">devDependencies</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><table><thead><tr><th>脚本参数</th><th>类型</th><th>必须</th><th>默认值</th></tr></thead><tbody><tr><td>@arg1(你项目的 openapi 的 json 导出地址)</td><td>string (http 或 https 链接)</td><td>是</td><td>无</td></tr><tr><td>@arg2(生成的 ts 类型文件名)</td><td>string</td><td>否</td><td>api-typing-meta.d.ts</td></tr></tbody></table><p>注意这里的<code>@arg1</code> 和<code>@arg2</code> 都要使用<code>&quot;&quot;</code>包裹起来，两个参数中间是有空格的。</p><p>这里提供两种常用的 openapi json<code>(@arg1)</code> 文档的地址获取方式</p><ol><li><p>如果后端项目用了 swagger 可以在 swagger-ui 的页面中找到</p></li><li><p>如果项目用的 apifox 则 openapi 的导出路径打开方式为<code>项目设置</code> &gt; <code>导出数据</code> &gt; <code>打开URL</code></p><p>​ <img src="https://github.com/yinzhenyu-su/api-typing/blob/main/apifox-openapi.png?raw=true%22" alt="apifox export openapi"></p></li></ol><h2 id="执行-get-types" tabindex="-1">执行 get-types <a class="header-anchor" href="#执行-get-types" aria-hidden="true">#</a></h2><p>在终端中运行以下命令</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">run</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">get-types</span></span>
<span class="line"></span></code></pre></div><p>然后检查项目的根目录有没有生成 api-typing-meta.d.ts，如果没有请检查上一步是否出错。</p><h2 id="配置-tsconfig-json" tabindex="-1">配置 tsconfig.json <a class="header-anchor" href="#配置-tsconfig-json" aria-hidden="true">#</a></h2><p>确保 api-typing-meta.d.ts 在根目录成功生成后，将该文件添加到 tsconfig.json 的 <strong>include</strong> 字段中</p><p><strong>tsconfig.json</strong></p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">include</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">api-typing-meta.d.ts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="开始使用吧" tabindex="-1">开始使用吧 <a class="header-anchor" href="#开始使用吧" aria-hidden="true">#</a></h2><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createHTTPClient</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">api-typing</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 这里createHTTPClient生成的是继承自 axios instance 的实例，你可以像使用axios一样添加你自己的interceptor</span></span>
<span class="line"><span style="color:#82AAFF;">createHTTPClient</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">baseURL</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">your baseURL</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// post 的 url无需手动填写，会根据你的项目自动提示可用的url，其他的请求方式同理</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">post</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">choose/url/with/hint</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     * 入参也会自动提示</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">d</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     * 这里的d同样继承自axiosresponse，d.data为接口返回的数据</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     */</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div>`,22),t=[o];function e(c,r,i,y,D,F){return n(),a("div",null,t)}const A=s(l,[["render",e]]);export{d as __pageData,A as default};
