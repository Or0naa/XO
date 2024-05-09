import style from './style.module.scss'

export default function X_index({isActive=true}) {
  return (
    <div className={isActive? style.X_O : style.gray}>
        <img src="./x.png" alt="" />

  </div>
  )
}
