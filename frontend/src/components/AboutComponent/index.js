import './aboutComponent.css'

const AboutComponent = () => {
    return (
        <div className='card-warp'>

            <div className='about-card'>

                <div className='about-card-photo'>

                    <img className='about-card-img' src='' />
                    <div className='about-card-title'>
                        <p>Brendan Downing</p>
                    </div>
                    <div className='card-description'>

                        <div className='card-links'>
                            <a href="https://github.com/Downster" target="_blank" />
                            <img className='card-link-logo' src={require('./images/git-logo.png')} />
                            <a href="https://www.linkedin.com/in/brendan-downing-641672228/" target="_blank" />
                            <img className='card-link-logo' src={require('./images/linkedin-logo.png')} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutComponent