import './developer.css'


const DeveloperComponent = () => {
    return (
        <div className='developer'>
            <a className='soundclout' target="_blank"
                href='https://github.com/Downster/SoundClout'>
                © 2022 | SoundClout
            </a>
            <p className='developed-by'>  Developed by Brendan Downing </p>
            <span>
                <a target="_blank"
                    href='https://github.com/Downster'>
                    <i className='fab fa-github' />
                </a>
            </span>
            <span>
                <a target="_blank"
                    href='https://www.linkedin.com/in/brendan-downing-641672228/'>
                    <i className='fab fa-linkedin' />
                </a>
            </span>

        </div>
    )
}

export default DeveloperComponent