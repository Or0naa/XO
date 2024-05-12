import { useState } from 'react'
import Frame from '../../components/Frame'
import styles from './style.module.scss'
import BackArrow from '../../components/BackArrow'
import { NavLink, useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store'
import { FiCheck } from 'react-icons/fi'
export default function PlayerDetails() {

    const nav = useNavigate()

    const { user, setUser } = useUserStore(
        (state) => ({
            user: state.user,
            setUser: state.setUser
        })
    )

    const handleChange = (e) => {
        setUser({ name: e.target.value });
    };

    const handleGoBack = () => {
        nav('/menu')
    }

    const imagesToChoose = ["./female.png", "./male.png", "./taltalaz.bmp", "./Woman.bmp", "./man.bmp"]
    const [chosenPhoto, setChosenPhoto] = useState("./taltalaz.bmp")

    const choosePhoto = (image) => {
        setUser({ ...user, avatar: image });
        setChosenPhoto(image);
    };

    console.log(user)

    return (
        <div className={styles.playerDetails}>
            <div>
                <img className={styles.logo} src='./logo.png' alt="" />
            </div>
            <Frame>
                <input className={styles.input} onChange={handleChange} type="text" placeholder='Enter Player Name' />
            </Frame>
            <div>
CHOOSE AVATAR            </div>
            <div className={styles.imagesToChoose}>
                {imagesToChoose.map((image, index) => (
                    <div key={index} onClick={() => choosePhoto(image)}>
                        <img src={image} alt={image} className={chosenPhoto == image ? styles.chosenPhoto : styles.photo} />
                    </div>
                ))}
            </div>

            <div className={styles.back}>
                <BackArrow handleGoBack={handleGoBack} />
                <button>
                    {<FiCheck className={styles.backArrow} />}</button>
            </div>

        </div>
    )
}
