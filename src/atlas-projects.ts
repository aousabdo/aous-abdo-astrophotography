import { homeProjects, projectFamilies } from './content'
const asset=(p:string)=>/^https?:\/\//.test(p)?p:'/'+p
export const archiveUrl='https://photos.app.goo.gl/6wq4MaV3zakDoaQB6'
export const relatedProjects=homeProjects.map((p,i)=>({...p,image:p.image?asset(p.image):'/projects/cosmos.png',className:i===0?'project-personal':i===1?'project-najm':'project-related'}))
export const widerProjects=projectFamilies.flatMap(f=>f.projects).filter(p=>!homeProjects.includes(p)).map(p=>({title:p.title,note:p.description,url:p.url}))
