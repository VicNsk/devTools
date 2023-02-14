import del from "del"

export const cleanDev = () => {
  return del(app.path.dev)
}

export const cleanBuild = (cb) => {
  del(app.path.build)
	return del(app.path.prod)
}