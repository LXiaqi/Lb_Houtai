import qs from	'qs';
//获取下载地址
export async function getAppSetting(that) {
    const res = await that.$http.get(window.API_ROOT+'/app/getAppSetting?key='+ that.key);
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    } 
    return res
}
// 修改下载地址， 苹果
export async function IosDownloadUrl(that) {
    const res = await that.$http.post(window.API_ROOT+'/app/changeIosDownloadUrl?url='+that.url);
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

// 修改下载地址  安卓
export async function AndroidDownloadUrl(that) {
    const res = await that.$http.post(window.API_ROOT+'/app/changeAndroidDownloadUrl?url='+that.url);
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

// 修改用户配置（查看资料价格查看照片数量）
export async function updateAppSetting(that) {
    const res = await that.$http.post(window.API_ROOT+'/app/updateAppSetting?key='+that.key+'&value='+that.val);
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