import React from 'react'
import {graphql, Link} from 'gatsby'
import get from 'lodash/get'
import '../style/index.less';
import './style/style.less';
import {startAnimation} from "../test";
import {Helmet} from "react-helmet";

const effects = {
    glitch: 'glitch-effect',
    code: 'code-effect',
    somethingElse: 'something-else-effect',
};

class IndexPage extends React.Component {
    state = {
        activeGlitch: false,
        activeCode: false,
        activeSomethingElse: false,
        windowWidth: 1,
    };

    componentDidMount() {
        this.setState({
            windowWidth: window.innerWidth
        })
    }


    animationLength = 2500;
    runInterval = 300;
    circleCount = Math.floor(this.animationLength / this.runInterval);
    numbersCount = 40;

    handleChangeClientState = async (newState, addedTags) => {
        if (addedTags && addedTags.scriptTags) {
            const promiseList = addedTags.scriptTags.map((tag) => {
                return new Promise((resolve) => {
                    tag.addEventListener('load', () => {
                        resolve()
                    }, {once: true})
                })
            });
            await Promise.all(promiseList);
            startAnimation()
        }
    }

    renderRandomNumber(index) {
        const number = (Math.random() > 0.5) ? 1 : 0;
        const color = (Math.random() > 0.5) ? '#ffffff' : '#14FF00';
        const left = Math.floor(Math.random() * this.state.windowWidth);
        const delay = Math.random();
        return <div key={index} style={{animationDelay: `${delay}s`, color, left}}
                    className="code-animation-container__number">{number}</div>;
    }

    renderCircle(index) {
        const delay = this.runInterval * index;
        return <div key={index} className="code-animation-container__circle">
            <div style={{animationDelay: `${delay}ms`}} className="code-animation-container__circle-inner"/>
        </div>
    }

    toggleGlitch = (activeGlitch) => {
        this.setState({
            activeGlitch
        })
    };

    toggleCode = () => {
        this.setState((prevState) => ({
            activeCode: !prevState.activeCode
        }))
    };

    toggleSomethingElse = () => {
        this.setState((prevState) => ({
            activeSomethingElse: !prevState.activeSomethingElse
        }))
    };

    handleNameStart = () => {
        this.toggleGlitch(true);
        document.body.classList.add(effects.glitch);
    }

    handleNameStop = () => {
        this.toggleGlitch(false);
        document.body.classList.remove(effects.glitch);
    }

    handleCodeStart = () => {
        this.toggleCode(true);
        document.body.classList.add(effects.code);
    }

    handleCodeStop = () => {
        this.toggleCode(false);
        document.body.classList.remove(effects.code);
    }

    handleSomethingElseStart = () => {
        this.toggleSomethingElse(true);
        document.body.classList.add(effects.somethingElse);
    }

    handleSomethingElseStop = () => {
        this.toggleSomethingElse(false);
        document.body.classList.remove(effects.somethingElse);
    }

    render() {
        const siteTitle = get(this, 'props.data.site.siteMetadata.title');
        const posts = get(this, 'props.data.allContentfulBlogPost.edges');
        const [author] = get(this, 'props.data.allContentfulPerson.edges');

        return (
            <div>
                <header className="header">
                    {/*<div className="header__burger">*/}
                    {/*    <svg className="header__burger-icon" width="64" height="64" viewBox="0 0 64 64">*/}
                    {/*        <rect x="0" y="22" width="64" height="6" fill="currentColor"></rect>*/}
                    {/*        <rect x="0" y="42" width="64" height="6" fill="currentColor"></rect>*/}
                    {/*    </svg>*/}
                    {/*</div>*/}
                    <div>
                        <svg width="43" height="60" viewBox="0 0 43 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.71753 41.7792C8.7987 40.5942 8.87987 39.4497 8.96104 38.3458C9.04221 37.2419 9.11526 36.1705 9.18019 35.1315L10.0568 23.638C10.1542 22.7614 10.2354 21.9659 10.3003 21.2516C10.3653 20.5211 10.414 19.8149 10.4464 19.1331C10.4951 18.4351 10.5357 17.737 10.5682 17.039C10.6169 16.3247 10.6656 15.5373 10.7143 14.6769C10.1786 14.6607 9.61039 14.6526 9.00974 14.6526C8.42532 14.6526 7.80844 14.6526 7.15909 14.6526H2.45942C2.28084 14.6526 2.16721 14.5877 2.11851 14.4578C2.08604 14.3117 2.06981 14.1818 2.06981 14.0682V13.8977L4.74838 6.86039L4.72403 6.76299C4.72403 6.68182 4.77273 6.61688 4.87013 6.56818C4.98377 6.50325 5.22727 6.45455 5.60065 6.42208C7.84091 6.29221 10.0081 6.17046 12.1023 6.05682C14.2127 5.92695 16.2906 5.81331 18.336 5.71591C20.3977 5.61851 22.4513 5.5211 24.4968 5.4237C26.5584 5.3263 28.6769 5.23701 30.8523 5.15585C31.0471 5.15585 31.25 5.1802 31.461 5.2289C31.6883 5.2776 31.8019 5.45617 31.8019 5.76461C31.8019 5.79708 31.7938 5.82955 31.7776 5.86201C31.7614 5.89448 31.7532 5.92695 31.7532 5.95942C31.4935 6.625 31.25 7.25812 31.0227 7.85877C30.8117 8.45942 30.6006 9.05195 30.3896 9.63636C30.1786 10.2208 29.9594 10.8133 29.7321 11.414C29.5211 12.0146 29.2857 12.6477 29.026 13.3133C29.0097 13.3295 28.9773 13.4107 28.9286 13.5568C28.8799 13.6867 28.8068 13.8409 28.7094 14.0195C28.612 14.1818 28.4821 14.336 28.3198 14.4821C28.1575 14.6282 27.9545 14.7094 27.711 14.7257C27.6299 14.7094 27.5487 14.7013 27.4675 14.7013C27.3864 14.7013 27.2971 14.7013 27.1997 14.7013H20.6981C20.6169 15.5292 20.5357 16.4058 20.4545 17.3312C20.3896 18.2565 20.3084 19.1575 20.211 20.0341L18.4334 39.0519C18.4172 39.1981 18.3847 39.3442 18.336 39.4903C18.3036 39.6364 18.1981 39.7419 18.0195 39.8068L11.1282 42.2906C10.9497 42.3555 10.7143 42.4367 10.4221 42.5341C10.1299 42.6315 9.84578 42.6802 9.5698 42.6802C9.34253 42.6802 9.13961 42.6234 8.96104 42.5097C8.7987 42.3961 8.71753 42.1851 8.71753 41.8766V41.7792Z" fill="black"/>
                            <path d="M34.1379 18.2208C34.0568 19.4058 33.9756 20.5503 33.8944 21.6542C33.8133 22.7581 33.7402 23.8295 33.6753 24.8685L32.7987 36.362C32.7013 37.2386 32.6201 38.0341 32.5551 38.7484C32.4902 39.4789 32.4415 40.1851 32.409 40.8669C32.3603 41.5649 32.3198 42.263 32.2873 42.961C32.2386 43.6753 32.1899 44.4627 32.1412 45.3231C32.6769 45.3393 33.2451 45.3474 33.8457 45.3474C34.4301 45.3474 35.047 45.3474 35.6964 45.3474L40.3961 45.3474C40.5746 45.3474 40.6883 45.4123 40.737 45.5422C40.7694 45.6883 40.7857 45.8182 40.7857 45.9318L40.7857 46.1023L38.1071 53.1396L38.1314 53.237C38.1314 53.3182 38.0827 53.3831 37.9853 53.4318C37.8717 53.4968 37.6282 53.5455 37.2548 53.5779C35.0146 53.7078 32.8474 53.8295 30.7532 53.9432C28.6428 54.073 26.5649 54.1867 24.5194 54.2841C22.4577 54.3815 20.4042 54.4789 18.3587 54.5763C16.297 54.6737 14.1785 54.763 12.0032 54.8442C11.8084 54.8442 11.6055 54.8198 11.3944 54.7711C11.1672 54.7224 11.0535 54.5438 11.0535 54.2354C11.0535 54.2029 11.0616 54.1705 11.0779 54.138C11.0941 54.1055 11.1022 54.073 11.1022 54.0406C11.362 53.375 11.6055 52.7419 11.8327 52.1412C12.0438 51.5406 12.2548 50.948 12.4659 50.3636C12.6769 49.7792 12.8961 49.1867 13.1233 48.586C13.3344 47.9854 13.5698 47.3523 13.8295 46.6867C13.8457 46.6705 13.8782 46.5893 13.9269 46.4432C13.9756 46.3133 14.0487 46.1591 14.1461 45.9805C14.2435 45.8182 14.3733 45.664 14.5357 45.5179C14.698 45.3718 14.9009 45.2906 15.1444 45.2743C15.2256 45.2906 15.3068 45.2987 15.3879 45.2987C15.4691 45.2987 15.5584 45.2987 15.6558 45.2987L22.1574 45.2987C22.2386 44.4708 22.3198 43.5942 22.4009 42.6688C22.4659 41.7435 22.547 40.8425 22.6444 39.9659L24.422 20.9481C24.4383 20.8019 24.4707 20.6558 24.5194 20.5097C24.5519 20.3636 24.6574 20.2581 24.836 20.1932L31.7272 17.7094C31.9058 17.6445 32.1412 17.5633 32.4334 17.4659C32.7256 17.3685 33.0097 17.3198 33.2857 17.3198C33.5129 17.3198 33.7159 17.3766 33.8944 17.4903C34.0568 17.6039 34.1379 17.8149 34.1379 18.1234L34.1379 18.2208Z" fill="black"/>
                        </svg>
                    </div>
                    <div className="header__info">
                        <Link to="/blog" className="header__channel header__link">МОЙ БЛОГ</Link>
                    </div>
                </header>
                <main>
                    <article className="first-block">
                        <h1 className="first-block__description">
                            <span onMouseEnter={this.handleNameStart} onMouseLeave={this.handleNameStop}
                                  className="first-block__name">Тимур Тогызбаев</span>
                            <span> фронтенд разработчик.</span>&nbsp;
                            {/*br показываются только на мобиле*/}
                            <br/>
                            <br/>
                            <span onMouseEnter={this.handleCodeStart} onMouseLeave={this.handleCodeStop}
                                  className="first-block__code">Кодю</span> сайты, приложения и&nbsp;
                            <span onMouseEnter={this.handleSomethingElseStart}
                                  onMouseLeave={this.handleSomethingElseStop}
                                  className="first-block__something">что-то еще</span>.
                        </h1>
                        <div className={`glitch-container ${this.state.activeGlitch ? 'glitch-container_active' : ''}`}>
                            <div className="glitch-container__item"></div>
                            <div className="glitch-container__item"></div>
                            <div className="glitch-container__item"></div>
                            <div className="glitch-container__item"></div>
                            <div className="glitch-container__item"></div>
                        </div>
                        <div
                            className={`code-animation-container ${this.state.activeCode ? 'code-animation-container_active' : ''}`}>
                            {new Array(this.numbersCount).fill(0).map((value, index) => this.renderRandomNumber(index))}
                            {new Array(this.circleCount).fill(0).map((value, index) => this.renderCircle(index))}
                        </div>
                        <div
                            className={`something-else j-something-else ${this.state.activeSomethingElse ? 'something-else_active' : ''}`}>
                        </div>
                    </article>
                </main>
                <Helmet onChangeClientState={this.handleChangeClientState}>
                    <script
                        src="https://code.jquery.com/jquery-3.4.1.min.js"
                        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
                        crossOrigin="anonymous"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js"
                            integrity="sha256-gSh8eotzb/CVvCREGPUNgIWuDnTYnZvVOQnRrP1eDjI="
                            crossOrigin="anonymous"></script>
                </Helmet>
            </div>
        )
    }
}

export default IndexPage

export const pageQuery = graphql`
    query HomeQuery {
        allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
            edges {
                node {
                    title
                    slug
                    publishDate(formatString: "MMMM Do, YYYY")
                    tags
                    heroImage {
                        fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
                            ...GatsbyContentfulFluid_tracedSVG
                        }
                    }
                    description {
                        childMarkdownRemark {
                            html
                        }
                    }
                }
            }
        }
        allContentfulPerson(
            filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
        ) {
            edges {
                node {
                    name
                    shortBio {
                        shortBio
                    }
                    title
                    heroImage: image {
                        fluid(
                            maxWidth: 1180
                            maxHeight: 480
                            resizingBehavior: PAD
                            background: "rgb:000000"
                        ) {
                            ...GatsbyContentfulFluid_tracedSVG
                        }
                    }
                }
            }
        }
    }
`
