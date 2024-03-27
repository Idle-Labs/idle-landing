
import { span } from './../../helpers';

export const HomeEnCopy = {
    heroSection: {
        title: 'Your Unique Edge For<div class="second-row"><span class="txt-rotate" data-period="3000" data-rotate=\'[ "On-chain", "Optimized", "Risk-adjusted", "Institutional", "Leveraged", "Sustainable" ]\'></span><span class="static">Yields</span></div>',
        desc: 'DeFi yields aren’t easy to manage.<br />Idle makes you feel like they are',
        discover: 'Discover more',
        btnEnter: {
            btnTitle: 'Enter App',
            btnSrc: 'https://app.idle.finance/',
        },
        btnRead: {
            btnTitle: 'Get involved',
            btnSrc: 'https://docs.idle.finance/products/get-involved',
        },
        investors:[
            {
                logoSrc: 'consensys-hero.svg',
                linkSrc: 'https://consensys.net',
            },
            {
                logoSrc: 'rockawayx-hero.svg',
                linkSrc: 'https://rockawayx.com',
            },
            {
                logoSrc: 'gumi-hero.svg',
                linkSrc: 'https://www.gumi-cryptos.com',
            },
            {
                logoSrc: 'fasanara-hero.svg',
                linkSrc: 'https://www.fasanara.com',
            },
        ]
    },
    productSection: {
        title: 'Automated, diversified<br />DeFi yields',
        subtitle: 'Yield optimization and risk tranching',
        desc: 'Come bears or bulls, our vaults make it easy to stay diversified for your long-term goals. Our vaults help you manage unnecessary risk, minimize your costs, and maximize your yields — all done (you guessed it) automatically.',
        cards: [
            {
                apy: 'APY',
                cardSubTitle: '',
                id: 'best-yield',
                apyPercent: '0.60%',
                apyDesc: '0.257 IDLE/day',
                cardTitle: 'Best Yield',
                cardLogoSrc: 'bestYieldRobot',
                // cardDesc: 'Maximize your yield across DeFi protocols',
                cardDesc: 'Best Yield vaults are designed to maximize yields. Like robo-advisors, deposits are routed through different strategies which seek out the highest yield available in DeFi.',
                infoTooltip: 'APY is based on (l) the current yield advertised by the underlying protocol, (ll)  the current distribution rate of governance tokens provided by underlying lending protocols (lll) the current estimated price of governance tokens from Uniswap spot prices. (lV) IDLE token distribution is referred to the entire pool',
                token: {
                    value: 'USDT',
                    title: 'TOKEN',
                    logoSrc: 'tusd.svg',
                },
                btnLaunch: {
                    btnTitle: 'Enter',
                    btnSrc: 'https://app.idle.finance/#/earn/best-yield',
                },
                btnIntegrate: {
                    btnTitle: 'Integrate',
                    btnSrc: 'https://docs.idle.finance/developers/best-yield',
                },
                lotties: {
                    'best-yield': {
                        className: ''
                    }
                },
                features: [
                    'Automated and algorithmic rebalance',
                    'Zero gas cost for optimization',
                    'Aggregated Senior/Junior risk exposure'
                ],
                partnersIcons: [
                    {
                        iconSrc: 'logoCompound.svg',
                    },
                    {
                        iconSrc: 'logoAave.svg',
                    },
                    // {
                    //     iconSrc: 'logoCircle.svg',
                    // }
                ],
            },
            {
                apy: 'APY',
                id: 'tranches',
                cardLogoSrc: 'tranches',
                cardSubTitle: '',
                apyPercent: '9.19%',
                apyDesc: '+382.96 IDLE/day',
                cardTitle: 'Yield Tranches',
                cardDesc: 'Diversify your DeFi exposure with Yield Tranches - split your yield source into Senior for stable returns with built-in coverage, and Junior for higher returns while minimizing the risk of loss to the Senior class.',
                infoTooltip: 'APY is based on (l) the current yield advertised by the underlying protocol, (ll) the current distribution rate of governance tokens provided by underlying lending protocols (lll) additional APY derived from staking',
                token: {
                    value: 'USDT',
                    title: 'TOKEN',
                    logoSrc: 'tusd.svg',
                },
                btnLaunch: {
                    btnTitle: 'Enter',
                    btnSrc: 'https://app.idle.finance/#/earn/yield-tranches',
                },
                btnIntegrate: {
                    btnTitle: 'Integrate',
                    btnSrc: 'https://docs.idle.finance/developers/perpetual-yield-tranches',
                },
                lotties: {
                    'senior': {
                        className: 'pos-1'
                    },
                    'junior': {
                        className: 'pos-2'
                    }
                },
                features: [
                    'DeFi risk diversification',
                    'Fully on-chain default settlement',
                    'Adaptive yield split to scale liquidity'
                ],
                partnersIcons: [
                    {
                        iconSrc: 'logoMorpho.svg',
                    },
                    {
                        iconSrc: 'logoLido.svg',
                    },
                    {
                        iconSrc: 'logoClearpool.svg',
                    },
                ],
            },
        ],
    },
    integrationSection: {
        title: 'The power of DeFi in a single protocol',
        desc: 'A one-stop solution for your funds. Stay ahead of the curve with a range of robust DeFi yield products. Scalable, secure and easy to use',
        integrations: [
            {
                title: 'Smart optimizations',
                desc: 'Maximize yields across several DeFi protocols, diversify your risk and shield liquidity providers from losses',
            },
            {
                title: 'Seamless yield monitoring',
                desc: 'Use our built-in dashboard to easily track and manage your assets. Real-time and historic performance data just one click away',
            },
            {
                title: 'Easy integration',
                desc: 'No need to stitch together disparate protocols or spend months integrating and updating yield functionality',
            },
            {
                title: 'Battle-tested reliability',
                // desc: 'Idle DAO has invested considerable effort to create an open and verifiable protocol that we believe is safe, scalable and redundant',
                desc: 'Time is the true judge. Considerable effort was invested to create resilient products, with countless reviews and audits',
            },
            {
                title: 'Fast-improving protocol',
                desc: 'Idle DAO and Leagues release hundreds of features and improvements each year to help you stay ahead of industry shifts',
            },
            {
                title: 'Transparent by design',
                desc: 'The smart contracts are trustless, decentralized and non-custodial. The code is publicly available and data is verifiable on-chain',
            },
        ],
    },
    securitySection: {
        title: 'Your assets, secured',
        subtitle: 'Audits have been done by Quantstamp, Diligence and Certik',
        desc: 'One of the longest-running and battle-tested DeFi protocol, going strong since 2019',
        // desc: 'Idle DAO’s smart contracts are easily verifiable and regularly audited, with an addition of a live bug bounty. Going full steam ahead since 2019, Idle DAO is one of the oldest battle-tested DeFi protocols',
        leftCard: {
            title: 'Security audits',
            latest: 'Security reports:',
            desc: 'Performed by world-leading security companies',
            info: 'Idle also follows strict integration guidelines',
            infoTooltip: 'Minimum standard requirements needed to implement a new yield source or an asset in Idle protocol include meeting the safety criteria in terms of due diligence, audits & performance of the protocol',
            tooltipLink: {
                title: 'Security guidelines',
                link: 'https://docs.idle.finance/developers/security/integration-standard-requirements',
            },
            audits: [
                {
                    title: 'Protocol audit',
                    date: 'December 2019 - April 2021',
                    src: 'https://certificate.quantstamp.com/full/idle-finance',
                    by: 'by Quantstamp',
                },
                {
                    title: 'Governance audit',
                    date: 'November 2020',
                    src: 'https://certificate.quantstamp.com/full/idle-goverance',
                    by: 'by Quantstamp',
                },
                {
                    title: 'Tranches audit',
                    date: 'December 2021',
                    by: 'by Certik and Consensys Diligence',
                    src: 'https://docs.idle.finance/developers/security/audits',
                },
            ],
        },
        rightCard: {
            title: 'Fortified by $100K bug bounty program',
            desc: 'Highest security standards mean audits alone are not enough. Find a smart contract bug or a security vulnerability and get rewarded',
            btnRead: {
                btnTitle: 'Bounty details',
                btnSrc: 'https://immunefi.com/bounty/idlefinance/',
            },
        },
    },
    protocolsSection: {
        title: 'An ecosystem full of yield',
        desc: 'Our vaults are composable by design and seamlessly incorporated into the expansive DeFi ecosystem',
        protocols:  [
            {
                id: 'integrators',
                label: 'Integrators',
                logos:[
                    {
                        logoSrc: 'enzyme.svg',
                        linkSrc: 'https://enzyme.finance',
                    },
                    {
                        logoSrc: 'shapeshift.svg',
                        linkSrc: 'https://shapeshift.com',
                    },
                    {
                        logoSrc: 'harvest.png',
                        linkSrc: 'https://harvest.finance',
                    },
                    {
                        logoSrc: 'balancer.svg',
                        linkSrc: 'https://balancer.fi',
                    },
                    {
                        logoSrc: 'popcorndao.png',
                        linkSrc: 'https://pop.network',
                    }
                ]
            },
            {
                id: 'yield-sources',
                label: 'Yield sources',
                logos:[
                    {
                        logoSrc: 'lido.svg',
                        linkSrc: 'https://lido.fi',
                    },
                    {
                        logoSrc: 'compound.svg',
                        linkSrc: 'https://compound.finance',
                    },
                    {
                        logoSrc: 'aave.svg',
                        linkSrc: 'https://aave.com',
                    },
                    {
                        logoSrc: 'morpho.svg',
                        linkSrc: 'https://morpho.org',
                    },
                    {
                        logoSrc: 'clearpool.svg',
                        linkSrc: 'https://clearpool.finance',
                    }
                ]
            },
            {
                id: 'investors',
                label: 'Investors',
                logos:[
                    {
                        logoSrc: 'consensys-desktop.svg',
                        linkSrc: 'https://consensys.net',
                    },
                    {
                        logoSrc: 'gumi-desktop.png',
                        linkSrc: 'https://www.gumi-cryptos.com',
                    },
                    {
                        logoSrc: 'green-desktop.svg',
                        linkSrc: 'https://www.greenfield.one',
                    },
                    {
                        logoSrc: 'longhash-desktop.png',
                        linkSrc: 'https://www.longhash.vc',
                    },
                    {
                        logoSrc: 'lao-desktop.png',
                        linkSrc: 'https://www.thelao.io',
                    },
                    {
                        logoSrc: 'fasanara.svg',
                        linkSrc: 'https://www.fasanara.com',
                    },
                ]
            },
            {
                id: 'chains',
                label: 'Supported chains',
                logos:[
                    {
                        logoSrc: 'ethereum-white.svg',
                        linkSrc: 'https://ethereum.org',
                    },
                    {
                        logoSrc: 'polygon.svg',
                        linkSrc: 'https://polygon.technology',
                    },
                    {
                        logoSrc: 'optimism.svg',
                        linkSrc: 'https://www.optimism.io',
                    }
                ]
            }
        ],
    },
    playersSection: {
        title: 'Ready to partner up?',
        subtitle: 'Join our Partner Program<br />and get up to <a href="https://docs.idle.finance/products/get-involved" target="_blank">50% fee share</a>',
        points: [
            {
                btnTitle: 'Join',
                linkTitle: 'Learn more',
                linkHref: 'https://docs.idle.finance/products/get-involved/integrators-program',
                btnSrc: 'https://idlefinance.typeform.com/to/PUC7nO?typeform-source=docs.idle.finance',
                title: 'DeFi<br />integrators',
                desc: 'Avoid the need to integrate multiple yield sources, and achieve the best risk adjusted yield with just one integration, powered by ERC-4626.',
            },
            {
                btnTitle: 'Join',
                linkTitle: 'Learn more',
                linkHref: 'https://docs.idle.finance/products/get-involved/institutions-program',
                btnSrc: 'https://idlefinance.typeform.com/to/Bumd4UjV?typeform-source=docs.idle.finance',
                title: 'Institutions and<br />Organizations',
                desc: 'From DAOs to institutions, Idle DAO provides yield optimization and risk diversification solutions for any treasury manager.',
            },
            // {
            //     title: 'Individual<br />DeFi users',
            //     desc: 'You want the best yield for your savings? Reliable security? Not to think about your yields on a day-to-day basis? All of that is available in one place. Visit the <a href="https://app.idle.finance/#/earn/yield-tranches" target="_blank">dashboard</a>, connect your wallet and deposit your funds today!',
            // },
        ],
    },
    statsSection: {
        title: 'Grow, save and automate',
        totalValue: {
            title: '-',
            subtitle: 'Total Value Locked (TVL)',
        },
        interestValue: {
            title: '+$10M',
            subtitle: 'Interest generated for LPs',
        },
        gasValue: {
            title: '+10K',
            subtitle: 'Rebalance performed',
        },
    },
    aboutSection: {
        title: 'How to Use Idle Finance',
        subtitle: 'Personalized based on your risk tolerance',
        tabs: [
            {
                link: 'Individual user',
                items: [
                    {
                        title: '1. Choose Your Strategy',
                        desc: 'Maximize your returns while keeping your risk tolerance in mind. We have strategies for max yield, and max security. And everything in between. The choice is yours',
                    },
                    {
                        title: '2. Deposit Your Crypto Assets',
                        desc: 'Enter the Dashboard and connect your wallet. Deposit your funds, relax and enjoy watching your earnings grow. Your funds will be automatically allocated among DeFi protocols based on the investment strategy of your choice',
                    },
                    {
                        title: '3. Automated Rebalancing',
                        desc: 'Idle consistently checks for better opportunities. It automatically keeps the appropriate allocation mix, depending on the strategy you chose. With no additional or hidden costs',
                    },
                    {
                        title: '4. On-demand Reports',
                        desc: 'Visit the dashboard and look at your funds in real-time whenever you want. Monitor your funds’ performance and rebalance events. See your estimated earnings and easily redeem your funds & interest',
                    },
                ],
            },
            {
                link: 'Hedge fund manager',
                items: [
                    {
                        title: '1. Check yields',
                        desc: 'Maximize your returns while keeping your risk tolerance in mind. We have strategies for max yield, and max security. And everything in between. The choice is yours',
                    },
                    {
                        title: '2. Connect Your Wallet',
                        desc: 'Enter the dashboard, connect your wallet and observe the APYs and products of your preference depending on your risk tolerance!',
                    },
                    {
                        title: '3. Deposit funds or Contact Leagues',
                        desc: 'Deposit your funds, relax and enjoy watching your earnings grow. Your funds will be automatically allocated among DeFi protocols based on the investment strategy of your choice. If you need help choosing a strategy, contact us!',
                    },
                    {
                        title: '4. Check Your Funds',
                        desc: 'Visit the dashboard and look at your funds in real-time whenever you want. Monitor your funds’ performance and rebalance events. See your estimated earnings and easily redeem your funds & interest',
                    },
                ],
            },
            {
                link: 'DAO treasury manager',
                items: [
                    {
                        title: '1. Check yields',
                        desc: 'Maximize your returns while keeping your risk tolerance in mind. We have strategies for max yield, and max security. And everything in between. The choice is yours',
                    },
                    {
                        title: '2. Connect Your Wallet',
                        desc: 'Enter the dashboard, connect your wallet and observe the APYs and products of your preference depending on your risk tolerance!',
                    },
                    {
                        title: '3. Deposit funds or Contact Leagues',
                        desc: 'Deposit your funds, relax and enjoy watching your earnings grow. Your funds will be automatically allocated among DeFi protocols based on the investment strategy of your choice. If you need help choosing a strategy, contact us!',
                    },
                    {
                        title: '4. Check Your Funds',
                        desc: 'Visit the dashboard and look at your funds in real-time whenever you want. Monitor your funds’ performance and rebalance events. See your estimated earnings and easily redeem your funds & interest',
                    },
                ],
            },
            {
                link: 'Protocol integrator',
                items: [
                    {
                        title: '1. Check yields',
                        desc: 'Maximize your returns while keeping your risk tolerance in mind. We have strategies for max yield, and max security. And everything in between. The choice is yours',
                    },
                    {
                        title: '2. Check Documentation',
                        desc: 'Check the extensive documentation we have for integrators of all types. With simple and straightforward instructions, integration has never been easier!',
                    },
                    {
                        title: '3. Start Implementation or Contact Leagues',
                        desc: 'You can integrate Idle strategies easily! Just follow the integration guidelines for any of our products. If you need help with the integration, please reach out to us!',
                    },
                    {
                        title: '4. Announce Integration',
                        desc: 'Once the integration has been completed, you can announce it within your community, and reach out to us to work out a co-marketing strategy',
                    },
                ],
            },
        ],
    },
    developersSection: {
        title: 'For Developers',
        desc: 'Just few lines of code to integrate the power of Idle into your dApp',
        leftWrap: {
            title: 'Integrate Idle as a DeFi Yield Source',
            desc: "A fully integrated suite of DeFi yield products easy to integrate into your dApp so your teams don't need to stitch together disparate protocols or spend months integrating and updating yield functionality. One integration to rule them all.",
            supportAssets: 'SUPPORTED ASSETS',
            assetsLogo: ['icon1.svg', 'icon2.svg', 'icon3.svg', 'icon4.svg', 'icon5.svg', 'icon6.svg', 'icon7.svg', 'icon8.svg', 'icon9.svg'],
            btnLaunch: {
                btnTitle: 'Launch App',
                btnSrc: 'https://app.idle.finance/#/best',
            },
            btnContact: {
                btnTitle: 'Contact Us',
                btnSrc: 'https://idlefinance.typeform.com/to/PUC7nO',
            },
        },
    },
    rewardSection: {
        title: 'Apply for the Idle Developer Grants Program',
        desc: 'Ready for your Idle challenge? Help Idle grow the ecosystem, work on the protocol R&D, or think of a task of your own. Complete the tasks and get rewarded!',
        btnLearn: {
            btnTitle: 'Learn More',
            btnSrc: 'https://idlelabs.notion.site/IGP-Idle-Grants-Program-a91d2937f24c4539a6538e48777fbfbd',
        },
    },
    communitySection: {
        title: 'Governance and community',
        subtitle: 'Idle is a fully decentralized, community-governed protocol',
        values: [
            {
                title:'3.7K',
                subtitle:'Token holders'
            },
            {
                title:'3.6M',
                subtitle:'Votes delegated'
            },
            {
                title:'115',
                subtitle:'Delegated addresses'
            },
            {
                title:'22',
                subtitle:'Proposals'
            }
        ],
        btnAboutGovernance: {
            btnTitle: 'Enter Governance',
            btnSrc: 'https://www.tally.xyz/gov/idle',
        },
        btnAboutCommunity: {
            btnTitle: 'Visit Forum',
            btnSrc: 'https://gov.idle.finance',
        },

        governance: {
            title: 'Governance forum',
            desc: 'Forum is focused on discussions about Idle Governance, new developments, and improvements of Idle protocol',
            btnLearn: {
                btnTitle: 'Learn More',
                btnSrc: 'https://gov.idle.finance/',
            },
        },
        socials: [
            {
                title: 'Twitter',
                logoSrc: 'twitter.svg',
                linkSrc: 'https://twitter.com/idlefinance',
            },
            {
                title: 'Discord',
                logoSrc: 'discord.svg',
                linkSrc: 'https://discord.com/invite/mpySAJp',
            },
        ],
    },
    investorsSection: {
        subtitle: '',
        title: 'Backed by industry pioneers',
        investors: [
            {
                logoSrc: 'consensys',
                linkSrc: 'https://consensys.net/',
            },
            {
                logoSrc: 'gumi',
                linkSrc: 'https://www.gumi-cryptos.com/',
            },
            {
                logoSrc: 'green',
                linkSrc: 'https://www.greenfield.one/',
            },
            {
                logoSrc: 'dialectic',
                linkSrc: 'https://dialectic.ch/',
            },
            {
                logoSrc: 'longhash',
                linkSrc: 'https://www.longhash.vc/',
            },
            {
                logoSrc: 'lao',
                linkSrc: 'https://www.thelao.io/',
            },
            {
                logoSrc: 'brcapital',
                linkSrc: 'https://br.capital/',
            },
        ],
    },
};
