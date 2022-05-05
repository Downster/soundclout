import './aboutComponent.css'

const AboutComponent = () => {
    return (
        <div className='card-warp'>

            <div className='about-card'>
                <div className='about-card-title'>
                    <p>Hey, I'm Brendan. Thanks for visiting my page </p>
                    <p>When I am not coding, I'm usually outside rock climbing or running!</p>
                </div>
                <div className='about-card-photo'>
                    <div className='image-container'>
                        <img className='about-card-img-climbing' src='https://i.imgur.com/Ra6sVVA.png' />
                        <img className='about-card-img' src='https://ca.slack-edge.com/T03GU501J-U02FGP5P25V-8f35f6fd19b3-512' />
                    </div>
                    <div className='card-description'>
                        <div className='card-links'>
                            <a href="https://github.com/Downster" target="_blank"> Visit my Github </a>
                            <img className='card-link-logo' src={require('./images/git-logo.png')} />
                            <a href="https://www.linkedin.com/in/brendan-downing-641672228/" target="_blank">Find me on linked in </a>
                            <img className='card-link-logo' src={require('./images/linkedin-logo.png')} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutComponent