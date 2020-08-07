// const root = process.env.API_ROOT;
import qs from	'qs'
// 用户列表
export async function userList(that) {
    const res = await that.$http.get(window.API_ROOT+'/manage/user/list?pageNum='+ that.listQuery.page+'&nickname='+that.nickname+'&phone='+that.phone
    +'&status='+that.states+'&isRecommend='+that.recommend+'&certificationCode='+that.attestation);
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    } 
    return res
}

// 用户禁用
export async function prohibit(that) {
    const data = {
        id:that.id,
        status:that.type
    }
    const res = await that.$http.post(window.API_ROOT+'/manage/toggle/user?id='+that.id+'&status='+that.type);
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    }else {
        that.$message({
            message: '成功',
            type: 'success'
        });
    }
    return res
}

// 用户推荐

export async function recommended(that) {
    const res = await that.$http.post(window.API_ROOT+'/manage/recommended/user?id='+that.id+'&isRecommend='+that.type2);
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

// 查看用户操作
export async function seeUser(that) {
    const res = await that.$http.get(window.API_ROOT+'/manage/view/user?id='+that.userid);
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    } 
    return res
}

// 封面审核列表
export async function coverPhotoList(that) {
    const res = await that.$http.get(window.API_ROOT+'/manage/coverPhotoList?pageNum='+ that.listQuery.page);
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    } 
    return res
}
// 审核封面
export async function verifyCoverPhoto(that) {
    let data = {
        userId:that.id,
        status:that.status
    }
    const res = await that.$http.post(window.API_ROOT+'/manage/user/verifyCoverPhoto',qs.stringify(data));
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

// 认证列表
export async function AttestationList(that) {
    
    const res = await that.$http.get(window.API_ROOT+'/manage/certification/list?pageNum='+that.listQuery.page+'&nickname='+that.nickname+'&phone='+that.phone
    +'&status='+that.status);
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    } 
    return res
}

// 认证操作
export async function Attestation(that) {
    const res = await that.$http.post(window.API_ROOT+'/manage/pass/user/authentication?certificationCode='+that.states+'&userId='+that.userid);
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    }else {
        that.$message({
            message: '成功',
            type: 'success'
        });
    }
    return res
}

// 给用户选择活动标签
export async function label(that) {
    const res = await that.$http.post(window.API_ROOT+'/manage/choose/user/label?labelId='+that.labelId+'&userId='+that.userid);
    if (res.code != 200) {
        that.$message({
            message: res.message,
            type: 'error'
        })
    } else {
        that.$message({
            message: '成功',
            type: 'success'
        });
    }
    return res
}

// 举报列表

export async function report(that) {
    const res = await that.$http.get(window.API_ROOT+'/manage/user/report/list?pageNum='+ that.listQuery.page+'&phone='+that.phone+'&reportedPhone='+that.phone2);
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    } 
    return res
}

// 删除举报
export async function delReport(that) {
    const res = await that.$http.post(window.API_ROOT+'/manage/user/report/delete?id='+that.id);
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

// 意见反馈列表
export async function opinionList(that) {
    const res = await that.$http.get(window.API_ROOT+'/manage/user/opinion/list?pageNum='+ that.listQuery.page+'&nickname='+that.nickname+'&phone='+that.phone);
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    } 
    return res
}

// 账号注销申请列表
export async function logoutList(that) {
    const res = await that.$http.get(window.API_ROOT+'/manage/user/logout/list?pageNum='+ that.listQuery.page+'&nickname='+that.nickname+'&phone='+that.phone);
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    } 
    return res
}

// 更新用户信息
export async function edituser(that) {
    const res = await that.$http.post(window.API_ROOT+'/manageUser/updateUserInfo',qs.stringify(that.userData));
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

// 用户标签列表查询
export async function LabelList(that) {
    const res = await that.$http.get(window.API_ROOT+'/label/selectByLabelType?gender='+that.activeName+'&labelType='+that.labelType);
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    } 
    return res
}

// 用户标签的添加（标签的）
export async function AddLabel(that) {
    let data = {
       gender:that.gender,
       height:that.height,
       width:that.width,
       iconUrl:that.iconUrl,
       iconUrlSelected:that.iconUrlSelected,
       labelType:that.labelType,
       parentId:that.pid,
       sort:that.sort,
       iconName:that.onename,
       subLabelType:that.subLabelType
    }
    const res = await that.$http.post(window.API_ROOT+'/label/addLabel',qs.stringify(data));
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

// 用户二级标签添加
export async function AddLabelTwo(that) {
    let data = {
       labelType:that.labelType,
       parentId:that.pid,
       iconName:that.val,
       gender:that.gender
    }
    const res = await that.$http.post(window.API_ROOT+'/label/addLabel',qs.stringify(data));
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


// 用户标签的删除 (标签) 
export async function DelLabel(that) {
    let data = {
        labelId:that.id,
    }
    const res = await that.$http.post(window.API_ROOT+'/label/delLabel',qs.stringify(data));
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
// 活动标签列表获取
export async function activityLabel(that) {
    const res = await that.$http.get(window.API_ROOT+'/label/getLabels?gender='+that.activeName+'&labelType='+that.labelType);
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    } 
    return res
}
// 标签的修改
export async function editLabel(that) {
    let data = that.label_edit
    const res = await that.$http.post(window.API_ROOT+'/label/updateLabel',qs.stringify(data));
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

// 用户评价标签

export async function evaluateLabel(that) {
    const res = await that.$http.get(window.API_ROOT+'/comment/getCommentList?gender='+that.activeName);
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    } 
    return res
}
// 添加评价标签
export async function Addevaluate(that) {
    let data = {
        name:that.name,
        gender:that.gender
    }
    const res = await that.$http.post(window.API_ROOT+'/comment/addComment',qs.stringify(data));
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

// 删除评价标签
export async function Delevaluate(that) {
    let data = {
        id:that.id,
    }
    const res = await that.$http.post(window.API_ROOT+'/comment/delComment',qs.stringify(data));
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
// 修改评价标签
export async function editEvaluate(that) {
    let data = that.label_data
    const res = await that.$http.post(window.API_ROOT+'/comment/updateComment',qs.stringify(data));
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