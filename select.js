const versions = ["dev","v1.0.0","v1.0.1","v1.0.2"]
const title = document.querySelector('#tsd-search a.title')
const baseUrl = '/utils/'

let currentVersion = window.location.pathname.replace(baseUrl, '').split('/')[0]
if (!versions.includes(currentVersion)) {
  currentVersion = 'dev'
  changeDevTitle()
}

console.log('当前版本：', currentVersion)

title.insertAdjacentHTML(
  'beforebegin',
  `
    <select id="plugin-versions-select" class="title" name="versions" onchange="goToVersion(event)">
        ${versions.map((version) => `<option value='${version}'>${version}</option>`).join('')}
    </select>
  `
)

document.querySelector('#plugin-versions-select').value = currentVersion

function goToVersion(version) {
  console.log(version.target.value)
  const tag = version.target.value
  if (tag === 'dev') {
    window.location.href = window.location.origin + baseUrl
    changeDevTitle()
  } else {
    window.location.href = window.location.origin + baseUrl + tag
  }
}

function changeDevTitle() {
  title.innerHTML = title.innerText.split(' ')[0] + ' - dev'
}