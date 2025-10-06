const modules = {}

const files = import.meta.glob('./**/*.store.js', { eager: true })

Object.keys(files).forEach((file) => {
  const moduleName = file
    .replace(/^\.\/|\/.*\.store\.js$/g, '')

  modules[moduleName] = files[file].default || files[file]
})

export default modules
