import React from 'react'
import {graphql} from 'gatsby'
import '../../style/index.less';
import './style/style.less';
import {startAnimation} from "./animation";
import {Helmet} from "react-helmet";
import Header from "../../components/header";

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
        return (
            <div>
                <Header/>
                <main>
                    <article className="first-block">
                        <h1 className="first-block__description">
                            <span onMouseEnter={this.handleNameStart} onMouseLeave={this.handleNameStop}
                                  className="first-block__name">Тимур Тогызбаев</span>
                            <span> фронтенд разработчик.</span>
                            {/*br показываются только на мобиле*/}
                            <br/>
                            <br/>
                            <span onMouseEnter={this.handleCodeStart} onMouseLeave={this.handleCodeStop}
                                  className="first-block__code"> Кодю</span> сайты, приложения и&nbsp;
                            <span onMouseEnter={this.handleSomethingElseStart}
                                  onMouseLeave={this.handleSomethingElseStop}
                                  className="first-block__something">что-то еще</span>.
                        </h1>
                        <div className={`glitch-container ${this.state.activeGlitch ? 'glitch-container_active' : ''}`}>
                            <div className="glitch-container__item"/>
                            <div className="glitch-container__item"/>
                            <div className="glitch-container__item"/>
                            <div className="glitch-container__item"/>
                            <div className="glitch-container__item"/>
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
