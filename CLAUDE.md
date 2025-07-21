# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

API-Typing 是一个基于 axios 的强类型 HTTP 客户端框架，通过 OpenAPI 规范自动生成类型定义，为前端开发者提供类型安全的 API 调用体验。

## Common Commands

### Development

- `pnpm run build` - 构建项目（快速模式通过 tsup）
- `pnpm run test` - 运行测试套件（包含构建、初始化和覆盖率）
- `pnpm run test:ui` - 启动 Vitest UI 界面
- `pnpm run test:coverage` - 运行测试并生成覆盖率报告

### Type Generation

- `pnpm run get-types` - 通过 CLI 从 OpenAPI 规范生成类型定义
- `get-types <jsonSchemaPath> <definitionPath>` - CLI 命令示例

### Documentation

- `pnpm run docs:dev` - 启动 VitePress 开发服务器
- `pnpm run docs:build` - 构建文档
- `pnpm run docs:serve` - 预览构建的文档

## Core Architecture

### Entry Points

- `src/index.ts` - 主入口，导出核心 API
- `src/api-typing.ts` - HTTP 客户端核心实现
- `bin/cli.mjs` - CLI 工具入口

### Type System Architecture

- `src/api-helper.ts` - 核心类型提取工具，定义了从 OpenAPI 规范中提取类型的工具类型
- `src/core-type.ts` - 请求参数类型定义，包含各种 HTTP 方法的参数结构
- `api-typing-meta.d.ts` - 自动生成的 API 类型定义文件

### Core Components

- `createHTTPClient()` - 主要工厂函数，创建类型安全的 HTTP 客户端
- `api-typing-proxy.ts` - 请求代理处理器，处理动态路径参数替换
- `global-status.ts` - 全局状态管理，跟踪请求计数
- `lib.ts` - Axios 命名空间和工具函数

### Key Features

1. **类型安全**: 通过 OpenAPI 规范自动推断请求/响应类型
2. **路径参数**: 自动处理 URL 中的 `{id}` 等路径参数
3. **查询参数**: 类型安全的 query 参数处理
4. **Mock 支持**: 内置 mock 配置支持
5. **请求计数**: 全局请求状态跟踪

### Testing

- 使用 Vitest 作为测试框架
- 测试文件位于 `src/test/`
- 包含类型检查测试 (`*.test-d.ts`)
- 支持覆盖率报告

### Build System

- 使用 tsup 进行快速构建
- 输出 ESM 和 CJS 格式
- 源码映射支持
- TypeScript 编译配置在 `tsconfig.json`

### CLI Tool

- 提供 `get-types` 命令生成类型定义
- 支持本地文件和远程 URL 作为 OpenAPI 规范源
- 环境变量支持: `API_TYPING_JSON_SCHEMA_PATH`
