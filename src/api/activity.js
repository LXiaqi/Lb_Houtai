// const root = process.env.API_ROOT;

// 活动审核
export async function activityList(that) {
    const res = await that.$http.get(window.API_ROOT+'/manage/user/activity/list?pageNum='+ that.listQuery.page+'&nickname='+that.nickname+'&phone='+that.phone);
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    } 
    return res
}
// 活动删除
export async function delactivity(that) {
    const res = await that.$http.post(window.API_ROOT+'/manage/user/activity/delete?id='+that.id);
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
// 活动照片列表
export async function activityPhoto(that) {
    const res = await that.$http.get(window.API_ROOT+'/manage/user/activity/image/list?pageNum='+ that.listQuery.page+'&nickname='+that.nickname+'&phone='+that.phone);
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    } 
    return res
}

// 活动照片的删除
export async function delphoto(that) {
    const res = await that.$http.post(window.API_ROOT+'/manage/user/activity/image/delete?id='+that.id);
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