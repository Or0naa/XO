import style from './style.module.scss'

export default function X_index({chosen}) {
  return (
    <div className={`${style.X_O} ${chosen ? style.bigger : ''} ${!chosen ? style.gray : ''}`}>
        <img src="./x.png" alt="" />

  </div>
  )
}
