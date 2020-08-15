// miniprogram/pages/cloud/cloud.js

// 初始化数据库
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 插入数据
  insert: async function () {
    let res = await db.collection('Users').add({
      data: {
        name: "科比",
        age: 41
      }
    })
  },
  // 更新数据
  // 既然要更新数据，那么就必须要知道唯一的标识，即id
  // 在数据库中，_id就是唯一的标识
  // .doc就是数据的唯一标识
  update: async function () {
    let res = await db.collection('Users').doc('3adec2825f373f9400bdfcfc57844a5').update({
      data: {
        age: 80
      }
    })
    console.log(res.stats.updated);
    if (res.stats.updated === 0) {
      err => {
        console.log(err)
      }
    }
  },
  // 查询数据
  search: async function () {
    let res = await db.collection('Users').doc('cfe347375f373b2d0080be05193591bf').get()
    console.log(res.data.age)
    console.log(res.data.name)
  },
  // 查询多个数据
  searchWhere: async function () {
    let {
      data: res
    } = await db.collection('Users').where({
      name: "edison"
    }).get()
    console.log(res)
  },
  // 删除数据
  remove: async function () {
    let {
      data: res
    } = await db.collection('Users').doc('3adec2825f373f9400bdfcfc5e7844a5').remove()
    console.log(res)
  },
  // 云函数sum
  sum: async function () {
    let {
      result: res
    } = await wx.cloud.callFunction({
      // 当前云函数的名称
      name: 'sum',
      data: {
        a: 2,
        b: 3
      }
    })
    console.log(res.sum)
  },
  // 云函数getOpenId
  getOpenId: async function () {
    let {
      result: res
    } = await wx.cloud.callFunction({
      name: 'login'
    })
    console.log(res.appid)
    console.log(res.openid)
  },
  // 云函数batchDel
  batchDel: async function () {
    try {
      let {
        result: res
      } = await wx.cloud.callFunction({
        name: 'batchDel'
      })
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  },
  // 存储--上传文件upload
  // 上传图片需要注意，在点击上传后，需要用户选择从相册中获取还是打开摄像头去拍摄新图片
  upload:function(){
    // 用户选择
    // API： wx.chooseImage(Object object) 从本地相册选择图片或使用相机拍照
    wx.chooseImage({
      // 最多可以选择的图片张数
      count: 1,
      // 所选的图片的尺寸
      sizeType: ['original', 'compressed'],
      // 选择图片的来源
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        // 这里生成的是一个路径（ 图片的本地临时文件路径列表 (本地路径) ）
        // 然后根据这个临时路径，将图片上传到云存储中
        console.log(tempFilePaths)
        wx.cloud.uploadFile({
          cloudPath:'test.png',
          // 这里要注意，filePath的参数是一个字符串，所以需要使用toString()
          filePath:tempFilePaths.toString(),
          // 之后要通过fileId去下载图片，所以要将其存储到数据库
          success: res => {
            // 返回文件 ID
            console.log(res.fileID)
            db.collection('Images').add({
              data:{
                fileId:res.fileID
              }
            })
          },
          fail: console.error
        })
      }
    })
  },
  // 存储--下载文件download
  download:function(){

  },
  // 存储--展示
  show:function(){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})