import { useState } from 'react'
import Frame from '../Frame'
import styles from './style.module.scss'
import BackArrow from '../BackArrow'
import { NavLink, useNavigate } from 'react-router-dom'
import { useUserStore, useOponentStore } from '../../store'
import { FiCheck } from 'react-icons/fi'

export default function GenericDetails({ playerType }) {

    const nav = useNavigate()

    const { user, setUser } = useUserStore(
        (state) => ({
            user: state.user,
            setUser: state.setUser
        })
    )
    const { opponent, setOpponent } = useOponentStore(
        (state) => ({
            opponent: state.opponent,
            setOpponent: state.setOpponent
        })
    )

    const handleChange = (e) => {
        if (playerType === 'user') {
            setUser({ ...user, name: e.target.value });
        } else {
            setOpponent({ ...opponent, name: e.target.value })
        }
    };

    const handleGoBack = () => {
        nav('/menu')
    }

    const imagesToChoose = ["./female.png", "./male.png", "./taltalaz.bmp", "./Woman.bmp", "./man.bmp"]
    const [chosenPhoto, setChosenPhoto] = useState("./taltalaz.bmp")

    const choosePhoto = (image) => {
        if (playerType === 'user') {
            setUser({ ...user, avatar: image });
        } else {
            setOpponent({ ...opponent, avatar: image })
        }
        setChosenPhoto(image);
    };

    const handleLetsPlay = () => {
        console.log(opponent)
        nav('/game')
    }

    return (
        <div className={styles.playerDetails}>
            <div>
                <img className={styles.logo} src='./logo.png' alt="" />
            </div>
            <Frame>
                <input className={styles.input} onChange={handleChange} type="text" placeholder='Enter your Name' />
            </Frame>
            <div>
                'CHOOSE AVATAR'
            </div>
            <div className={styles.imagesToChoose}>
                {imagesToChoose.map((image, index) => (
                    <div key={index} onClick={() => choosePhoto(image)}>
                        <img src={image} alt={image} className={chosenPhoto === image ? styles.chosenPhoto : styles.photo} />
                    </div>
                ))}
            </div>

            <div className={styles.back}>
                <BackArrow handleGoBack={handleGoBack} />
                <button onClick={handleLetsPlay}>
                    {<FiCheck className={styles.backArrow} />}
                </button>
            </div>

        </div>
    )
}
