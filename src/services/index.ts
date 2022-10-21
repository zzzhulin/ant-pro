import type { AnaRes, Batch, HttpResponse, Sample } from '@/types';
import { request } from 'umi';
import { PREFIX as prefix } from '@/constants';

// 查询用户信息
export async function queryUserInfo() {
  return request<HttpResponse>(`${prefix}/flowService/permissions`);
}

// 查询分析批次列表
export async function queryBatchList(params: Batch.QueryParams) {
  return request<HttpResponse>(`${prefix}/batchService/queryBatch`, { params });
}

// 查询样本列表
export async function querySampleList(params: Sample.QueryParams) {
  return request<HttpResponse>(`${prefix}/flowService/query`, { params });
}

// 查询分析结果
export async function queryAnalysisResult(params: AnaRes.QueryParams) {
  return request<HttpResponse>(`${prefix}/resultService/queryResult`, {
    data: params,
    method: 'POST',
  });
}

// 导出样本
export async function downloadSamples(params: Sample.DownloadParams) {
  return request(`${prefix}/flowService/downloadSamples`, {
    data: params,
    method: 'POST',
    getResponse: true,
    responseType: 'blob',
  });
}

// 下载分析结果
export async function downloadSampleAnalysisResult(params: AnaRes.DownloadParams) {
  return request(`${prefix}/resultService/downloadSamplesResult`, {
    data: params,
    method: 'POST',
    getResponse: true,
    responseType: 'blob',
  });
}
