//首页数据展示
// const root = process.env.API_ROOT;

export async function home(that) {
    const res = await that.$http.get(window.API_ROOT+'/manage/system/home');
    if (res.code != 200) {
        that.$message({
            message: res.msg,
            type: 'error'
        })
    } 
    return res
}