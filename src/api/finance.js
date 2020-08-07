import qs from	'qs'
// 充值规则
export async function rechargeRule(that) {
    const res = await that.$http.get(window.API_ROOT+'/goods/getGoodsList?goodsType='+that.type+'&platform='+that.activeName);
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    }
    return res
}
// 添加充值规则
export async function addRule(that) {
    let data;
    if(that.goodsType == '1') {
        data = {
            goodsType:that.goodsType,
            price:that.money,
            liaoCoin:that.liaoCoin,
            platform:that.radio,
            title:that.money
        }
    } else {
        data = {
            goodsType:that.goodsType,
            price:that.money,
            title:that.title,
            platform:that.radio,
            subGoodsType:that.subGoodsType,
            liaoCoin:that.liaoCoin,
        }
    }
    const res = await that.$http.post(window.API_ROOT+'/goods/addGoods',qs.stringify(data));
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    }else {
        that.$message({
            message: '添加成功',
            type: 'success'
        });
    }
    return res
}
// 删除充值规则
export async function delRule(that) {
    let data = {
        goodsId:that.id
    }
    const res = await that.$http.post(window.API_ROOT+'/goods/deleteGoods',qs.stringify(data));
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    }else {
        that.$message({
            message: '删除成功',
            type: 'success'
        });
    }
    return res
}
// 修改充值规则
export async function editRule(that) {
    let data;
    if(that.goodsType == '1') {
        data = {
            goodsType:that.goodsType,
            price:that.tebData.price,
            liaoCoin:that.tebData.liaoCoin,
            id:that.tebData.id,
            platform:that.radio,
            title:that.tebData.price
        }
    } else {
        data = {
            goodsType:that.goodsType,
            liaoCoin:that.tebData.liaoCoin,
            price:that.tebData.price,
            id:that.tebData.id,
            platform:that.radio,
            subGoodsType:that.tebData.subGoodsType,
            title:that.tebData.title
        }
    }

    const res = await that.$http.post(window.API_ROOT+'/goods/updateGoods',qs.stringify(data));
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    }else {
        that.$message({
            message: '修改成功',
            type: 'success'
        });
    }
    return res
}
//充值提现列表
export async function rechargeList(that) {
    const res = await that.$http.get(window.API_ROOT+'/order/getOrderListByType?orderType='+that.type+'&pageNum='+that.listQuery.page+'&userId='+that.userId);
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    }
    return res
}
//充值提现列表
export async function recharge_List(that) {
    const res = await that.$http.get(window.API_ROOT+'/order/getOrderList?pageNum='+that.listQuery.page);
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    }
    return res
}

// 体现审核
export async function verifyCashOut(that) {
    let data = {
        status:that.status,
        userOrderId:that.orderid
    }
    const res = await that.$http.post(window.API_ROOT+'/order/verifyCashOut',qs.stringify(data));
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    }else {
        that.$message({
            message: '操作成功',
            type: 'success'
        });
    }
    return res
}


// 获取聊天需要的撩币， 分成， 
export async function chat(that) {
    const res = await that.$http.get(window.API_ROOT+'/app/getAppSetting?key='+that.activeName,);
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    }
    return res
}

// 修改聊天需要的撩币
export async function chatEdit(that) {
    const res = await that.$http.post(window.API_ROOT+'/app/changeChatPrice?chatPrice='+that.price,);
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    }else {
        that.$message({
            message: '修改成功',
            type: 'success'
        });
    }
    return res
}

// 修改获得的撩币
export async function getPriceEdit(that) {
    const res = await that.$http.post(window.API_ROOT+'/app/changeChatGetRate?rate='+that.price,);
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    }else {
        that.$message({
            message: '修改成功',
            type: 'success'
        });
    }
    return res
}

// 提现的比例

// 修改聊天需要的撩币
export async function cashout_L(that) {
    const res = await that.$http.post(window.API_ROOT+'/app/changeCashOutRate?rate='+that.price,);
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    }else {
        that.$message({
            message: '修改成功',
            type: 'success'
        });
    }
    return res
}