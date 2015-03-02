module.exports = exports = {
  development: {
    files: {
      "dist/css/style.css": "app/less/style.less"
    }
  },
  production: {
    options: {
      cleancss: true,
      compress : true,
      ieCompat:true
    },
    files: {
      "dist/css/style.css": "app/less/style.less",
      "dist/css/findcar/findcar.css": "app/less/findcar/findcar.less",
      "dist/css/index/index.css": "app/less/index/index.less",
      "dist/css/webuy/webuy.css": "app/less/webuy/webuy.less",
      "dist/css/weibusiness/weibusiness.css": "app/less/weibusiness/weibusiness.less",
      "dist/css/personalsell/personalsell.css": "app/less/personalsell/personalsell.less",
      "dist/css/introduce/introduce.css": "app/less/introduce/introduce.less",
      "dist/css/guohu/guohu.css": "app/less/guohu/guohu.less",
      "dist/css/yindex/index.css": "app/less/yindex/index.less",
      "dist/css/ypages/ypages.css": "app/less/ypages/ypages.less",
      "dist/css/detail/detail.css": "app/less/detail/detail.less",
      "dist/css/ad/ad.css": "app/less/ad/ad.less",
      "dist/css/activity/index.css": "app/less/activity/index.less",
      "dist/css/activity/detail.css": "app/less/activity/detail.less",
      "dist/css/ypicture/index.css": "app/less/ypicture/index.less",
      "dist/css/yshop/topten.css": "app/less/yshop/topten.less",
      "dist/css/ynew/index.css": "app/less/ynew/index.less",
      "dist/css/style.css": "app/less/style.less"
    }
  }
};