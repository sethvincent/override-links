require('../index')(document.body, function (pathname, link) {
  console.log(pathname, link)
})