import style from './style.module.scss'

export default function O_index({chosen}) {
  return (
    <div  className={`${style.X_O} ${chosen ? style.bigger : ''} ${!chosen ? style.gray : ''}`}>
    <img src="./o.png" alt="" />
  </div>
  )
}