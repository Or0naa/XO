import style from './style.module.scss'

export default function O_index({isActive=true}) {
  return (
    <div className={isActive? style.X_O : style.gray}>
    <img src="./o.png" alt="" />
  </div>
  )
}