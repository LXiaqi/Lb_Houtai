import qs from 'qs'
//登录
export async function logins(that) {
    const res = await that.$http.post(window.API_ROOT + '/manage/adminLogin?adminUser=' + that.username + '&password=' + that.password);
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    }
    return res
}
// 添加账号
export async function addAccount(that) {
    let data = {
        adminName: that.nickname,
        password: that.password,
        realName: that.realName
    }
    const res = await that.$http.post(window.API_ROOT + '/manage/addAdminUser', data);
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    }
    return res
}
// 账号列表
export async function AccountList(that) {
    const res = await that.$http.get(window.API_ROOT + '/manage/adminList');
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    }
    return res
}

// 修改密码
export async function editPassWord(that) {
    let data = {
        adminUser: that.username,
        password: that.password,
        oldPassword: that.oldPassword
    }
    const res = await that.$http.post(window.API_ROOT + '/adminUser/changeAdminPassword', qs.stringify(data));
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    } else {
        that.$message({
            message: '修改成功',
            type: 'success'
        });
    }
    return res
}