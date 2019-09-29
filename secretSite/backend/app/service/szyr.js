'use strict';

const Service = require('egg').Service;

class SzyrService extends Service {

  /**
   * 获取所有房间列表
   */
  async getAllRoom() {
    const { ctx } = this;
    const res = await ctx.curl(`${ctx.app.config.szyrHost}/video_rest/index/all_anchor`);
    const r = /\(([^\(\)]*)\)/.exec(String(res.data));
    if (!r) {
      throw new Error('szyr getAll parse faile');
    }
    const jsonStr = r[1];
    const roomList = JSON.parse(jsonStr).anchors;
    return roomList.filter(item => item.status === 1);
  }
}

module.exports = SzyrService;