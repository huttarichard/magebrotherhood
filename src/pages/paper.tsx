import styled from "@emotion/styled";
import { PageLayout } from "components/Layout/Layout";

const Main = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 15px;

  blockquote {
    border-left: 4px solid #ec12f9;
    margin-left: 0;
    margin-right: 0;
    padding-left: 40px;
    font-style: italic;
  }
`;

const Break = styled.br`
  break-after: page;
`;

export default function SwapPaperFormalPage() {
  {
    /* we need to describe the vision of creating standart */
  }
  {
    /* we need to explain why metavaerse */
  }
  {
    /* we need to explain value of the coin */
  }
  {
    /* we need to explain dao */
  }
  {
    /* we need to explain no scam */
  }

  return (
    <PageLayout
      title="Formal Litepaper"
      description="Understand in-depth our economy and our ecosystem. 20 min reading."
    >
      <Main>
        <h1>MageBrotherhood</h1>
        <p>
          Existing P2E blockchain games have been known to; be highly uninteresting, unsustainable, have a bad
          tokenomics and a high entry price. These deficiencies have made gaming (and crypto) enthusiasts distance
          themselves from this sector of the blockchain industry.
        </p>
        <p>
          MageBrotherhood envisions creating a paradigm shift in the blockchain gaming industry by establishing a
          balance between EARNING and LOSING. MageBrotherhood focuses its attention on making the gaming experience fun
          and the earning more compelling for players while also keeping necessary balance to not turn its tokenmoics
          into ponzi scheme.
        </p>
        <blockquote>
          “Thrill of losing as much as earning is known as gambling. It’s also the only sustainable model when balance
          is kept.”
        </blockquote>
        <p>
          MageBrotherhood plans to infuse 3D, AR and VR technologies into its platform to create a seamless and exciting
          gaming environment to attract players & investors. To improve the sustainability of the project,
          MageBrotherhood intends to integrate scaling solutions, edge technologies, and well designed ecosystem which
          will reduce gaming transaction fees and allow ecosystem users/players to efficiently interact with one
          another.{" "}
        </p>
        <b>
          Our goal is not to make an ecosystem-first environment and MageBrotherhood being the first proof and awesome
          game to play. However long term perspective would be to bring even more games onboard and allow replication of
          the ecosystem for other games as well. We love opensource and we will be publishing source and research as a
          journey will be guiding us.
        </b>
        <Break />
        <h2>Foreword</h2>
        <p>
          MageBrotherhood is a blockchain-backed ecosystem-first Play to Earn platform that allows users to earn
          incentives while doing what they enjoy i.e., Gaming. A community-driven platform, MageBrotherhood gives power
          to the users by forcing rules and focusing on keeping balance (unlike traditional P2E games).
        </p>
        <p>
          MageBrotherhood’s mission is to revolutionize the GameFi sector of the blockchain gaming industry by combining
          the features and attributes of web3 technologies (power of decentralisation), and emerging technologies of 3D
          space (such as AR, VR) all in one place and integrating them into a gamified environment, creating a unique
          and immersive experience for users.
        </p>
        <p>
          MageBrotherhood combines gaming and finance to offer rewards to users for interacting with the platform,
          playing the game and progressing while adding the thrill of losing for players that do not win. Our first game
          will allow users to earn incentives in different ways which includes:
        </p>
        <ul>
          <li>
            Earning MageBrotherhood tokens by completing daily objectives, playing the game and interaction with other
            players on the platform.
          </li>
          <li>
            Obtaining or trading MageBrotherhood NFTs with each NFT representing a game object, character, land, items,
            any many more. These NFTs serve a functional purpose in on the MageBrotherhood ecosystem.
          </li>
          <li>
            MageBrotherhood also allows users to stake NFTs to earn more incentives on the platform. With the primary
            goal to equally distribute value across players and investors and to not allow centralization of assets.
          </li>
        </ul>
        <p>
          Our plan is to share edge technologies; share assets; share research and do good things with resources we
          (will) have. We are committed to bring value with hard work and act wisely when it comes to giving rules.
        </p>
        <Break />
        <h2>Implementation</h2>
        <p>
          From many reasons we choose to use Ethereum blockchain and solidity for our decentralised ecosystem, but
          mainly for following:
        </p>
        <ul>
          <li>
            Maturity of solidity is high; and even if webassembly will catch up we believe it is still one of the best
            programming languages you can choose today to write dapps.
          </li>
          <li>
            Ethereum has been through many phases of development and is still subject of most edge research. Its
            adaptation is very high and we do believe it will stay for a while. It aligns with our core principle of
            sustainability.
          </li>
        </ul>
        <h3>NFTs (ERC1155 &amp; ERC721)</h3>
        <p>
          NFTs have been widely used to sell digital art and virtual goods. It’s also been known to be a good tool of
          various shady sellers and people who made simple derivatives of existing art and allow people to speculate on
          its price while taking profit from its initial phase known as minting.{" "}
        </p>
        <p>
          This has been a concern of developers and the community as whole, because no value is produced and in the end
          people end up “holding bags” of useless images.
        </p>
        <p>
          NFTs are similar in nature to ERC20 tokens, in fact code-wise they are very similar except the part where
          fungibility takes role and today we know ERC20 tokens play a big role in how value is distributed. By
          tokenizing real-world assets we can achieve stability and allow for easy ownership.
        </p>
        <blockquote>
          ”Real purpose of NFTs is to represent ownership. Owning NFT has no other value except what is the value of its
          underlying asset.”
        </blockquote>
        <p>
          MageBrotherhood is aiming to introduce and give new life to the well known standard of semi fungible tokens.
          Known as ERC1155; where one token can be owned by multiple parties. For gaming environments where each asset
          needs to be carefully crafted, this is much more compelling than representing each asset with its own unique
          token.
        </p>
        <p>
          We are distinguishing three types of assets, ones which are fully fungible in our case Borhterhood Coin
          (ERC20). Assets which are semi fungible such as characters and items which can be owned by multiple parties
          (ERC1155). And ones which are fully unique such as “land” or digital property in game (ERC721).
        </p>
        <p>
          All of these tokens are on its own useless and as stated previously, they are just representing ownership in a
          specific way. Actual value comes from people creating these assets. Today thanks to the IPFS we are now able
          to put anything into the decentralised space, and so by bringing standards we can enforce assets to be well
          designed for games and serve its purpose; not to be just marketing material.
        </p>
        <p>
          We are committed to making rules so artists building 3D characters or developers building games have to stick
          to certain standards and allow other participants to build new assets which can be owned by anyone.
        </p>
        <p>
          Our strategy is to bring a few well crafted assets for our first game and let the community do the rest. By
          intenciving artists and developers we can let the community decide if a given token should be introduced to
          other members or rather be discarded.
        </p>
        <h3>Liquidity bootstrapping</h3>
        <p>
          To give these assets any meaning we need investors to recognize its value. That is why most of the liquidity
          collected from sale will be put directly into exchange to provide backing of Brotherhood Coin. This will be
          directly included in the contract.
        </p>
        <blockquote>
          “Our goal is not to take value from our users. Our goal is to incentivize the right people to do their job,
          while preserving value and bringing more investors and gamers onboard into decentralised space.”
        </blockquote>
        <p>
          Each (non fully fungible) token minted will eventually return its value in form of BHC ERC20 which will be
          tradable back to ETH thanks to the staking.
        </p>
        <p>
          Every MageBrotherhood NFT belongs to its owner and can be traded or sold on existing marketplaces at the
          owners’ discretion.
        </p>
        <p>
          Furthermore, MageBrotherhood will partner with brands to launch their limited edition NFT collections on its
          marketplace, further down the road.
        </p>
        <h3>Coin &amp; Exchange</h3>
        <p>
          The MageBrotherhood DEX allows players to transact directly with one another. It&apos;s a marketplace whereby
          transactions are not facilitated by intermediaries. The BHC token (ERC20 & Exchange) provides monetary policy
          that are aligned with rules of ecosystem.
        </p>
        <p>
          While uniswap and others allows for similar functionality to be implemented more easily we decided that we
          rather want to build our own exchange and main reasons are outlined in following points:
        </p>
        <ul>
          <li>We are not looking to reward liquidity providers as users “minting” NFTs will be liquidity makers.</li>
          <li>
            We are not interested in exchange to be targeted by traders and bots; we are fully aware that will happen
            anyway if our ideas come to life, but for a certain amount of time we at least make this more difficult.
          </li>
          <li>
            Written exchange from scratch allows us to redesign some key principles of how it operates, such as allowing
            for taxation.
          </li>
        </ul>
        <p>
          To have a balance between price inflation generated by staking and token supply, we implemented a 5% selling
          tax. This should prevent short term speculation and manipulation to a certain degree. Of course collected
          taxes will stay in exchange to provide more liquidity.
        </p>
        <p>Selling tax might be subject to regulation until DAO is fully introduced.</p>
        <h3>Staking</h3>
        <p>
          To equally distribute the value and rewards to early investors and gamers (for participating in NFTs sale), we
          decided to introduce staking.
        </p>
        <p>
          NFT holders are allowed to stake NFTs and earn BHC tokens as rewards. Staking supply will be provided by
          removing BHC liquidity from the MageBrotherhood DEX. The more NFTs you stake, the more BHC tokens you earn and
          vice-versa. Each NFT will have its own staking weight which might be decided together with its “minting”
          price.{" "}
        </p>
        <p>
          Each epoch of staking will allow investors to claim their reward and if they wish to they can withdraw via
          exchange.
        </p>
        <p>
          Each NFT sale produces more ETH being locked in the ecosystem therefore pushing the price of BHC higher. This
          brings more investors which want to just speculate on the price of BHC, but they will be introduced to selling
          tax and will be forced to leave some value behind which rewards NFT holders.
        </p>
        <p>
          While short term speculators might benefit from short term profits, users participating in NFT sale will be
          rewarded in the long term as staking will produce inflation until the value of reward invested will not exceed
          the value they originally put in.{" "}
        </p>
        <p>There is no minimum amount of NFT that can be staked or a minimum lock-up period.</p>
        <h3>Affiliate</h3>
        <p>
          In a bid to reward active users of our community for influencing the MageBrotherhood platform. We are
          introducing the MageBrotherhood Affiliate.{" "}
        </p>
        <p>Marketing is an important key to every project and how better to do it then in decentralised matter.</p>
        <p>
          Every user (influencer) is given the opportunity to register a marketing code. Each mint with given code will
          discount the minting process while rewarding the influencer in the form of BHC.
        </p>
        <h3>Betting and Auctions</h3>
        <p>
          In the MageBrotherhood environment, players will be able to compete against one another for bragging rights
          using BHC or NFTs.
        </p>
        <p>
          Periodic NFT auctions will be hosted on the MageBrotherhood marketplace to further enhance ownership
          experience.
        </p>
        <h3>DAO</h3>
        <p>
          DAOs signal power over centralized entities. We believe that any crypto project seeking to put its community
          at its epicentre will have its own DAO. This is why MageBrotherhood chooses to hand over its full power to its
          community.
        </p>
        <p>
          Later on, MageBrotherhood token and NFT holders will be able to control and govern the day-to-day happenings
          of the MageBrotherhood ecosystem like submitting, requesting and voting for/against certain updates as well as
          changing the governance structure itself.
        </p>
        <p>
          With the MageBrotherhood DAO fully in operation, the community will have the chance to shape the future of
          MageBrotherhood.
        </p>
        <Break />
        <h2>Gamification Mechanics </h2>
        <p>
          The gamification mechanics for the MageBrotherhood game involves the strategic elements implemented in the
          game. The gamification mechanics will be flexible and new features will be introduced into the MageBrotherhood
          ecosystem as time goes by.
        </p>
        <h3>In-game Spending Burns</h3>
        <p>
          During games, transactions are carried out. In the course of carrying out transactions, BHC tokens are burnt.
          Burning helps facilitate the deflation of the BHC token thereby increasing its value.{" "}
        </p>
        <h3>Quests</h3>
        <p>
          Players can interact with the MageBrotherhood gaming ecosystem to complete quests and earn a plethora of
          rewards. MageBrotherhood’s web3 development will make quests more interesting as it would involve Arand VR
          features.
        </p>
        <h3>Loans</h3>
        <p>
          Players can earn passive income by lending out valuable NFTs to other players. This could involve lending out
          Battle NFTS, Brotherhood Upgrades NFTs etc. in exchange for a share of rewards.
        </p>
        <p>
          This effectively creates yield-generating NFTs, enhancing their value proposition for their holders and making
          lending NFTs more viable.
        </p>
        <h3>Renting</h3>
        <p>
          With the web3 fully integrated into the gamification environment, players will be able to rent out their
          virtual properties and they will be paid a renting fee by the rentee. This allows players earn extra income
          apart from the regular earning routine.
        </p>

        <Break />
        <h2>Team</h2>
        <p>
          Our team is made up of capacitated individuals working together to attain a common goal i.e create and develop
          MageBrotherhood. We are committed towards making the development of the project as transparent as possible so
          every team member is accessible to the community.
        </p>
        <p>
          You&apos;ll be able to meet them and interact with them in our weekly live AMAs, join our Telegram and Discord
          groups to keep up with them, and watch their interviews on numerous channels.
        </p>
        <p>
          The end-goal of our team is to hand over a successful and efficient project to the MageBrotherhood community
          for continuous development.
        </p>

        <ul>
          <li>
            <b>Founder - Richard Hutta</b>
            <p>
              A software engineer with over 10 years of experience, Richard Hutta has built profitable business spanning
              three continents. His passion for technology and the developing a community-oriented project motivates him
              to work smarter to attain his objectives.
            </p>
          </li>

          <li>
            <b>Co-Founder – Petr Brazdil</b>
            <p>
              Petr is a technologist to the core. With experiences in several technological sectors spanning from web
              development to software engineering, Petr has huge contributions to different organizations in those
              sectors. His sheer will to make everything around him better led to his discovery of the blockchain. Petr
              is a graduate of the prestigious Masaryk University.
            </p>
          </li>

          <li>
            <b>Gamification Developer – Daragh Wickham</b>
            <p></p>
          </li>

          <li>
            <b>Gamification Designers – D4 group (Ukraine-based)</b>
            <p></p>
          </li>

          <li>
            <b>Luis – Graphic Designer</b>
            <p></p>
          </li>

          <li>
            <b>Web Developer – Michal Bartczak</b>
            <p></p>
          </li>
        </ul>

        <Break />
        <h2>Research and Development</h2>

        <h3>Polygon PoS Layer-2 Scaling</h3>
        <h3>Zero Knowledge Proof</h3>
        <h3>Decentralized state synchronization</h3>

        <Break />
        <h2 id="disclaimer">Disclaimer</h2>
        <p>
          Cryptocurrency trading entails a high level of risk and is not suited for all investors. You should carefully
          evaluate your investment objectives, degree of experience, and risk appetite before deciding to trade
          cryptocurrencies. You should invest money that you can afford to lose because there is a chance that you will
          lose some or all of your initial investment. You should be aware of all the dangers connected with
          cryptocurrency trading and seek counsel from a financial expert who is not affiliated with any cryptocurrency
          exchange. The MageBrotherhood team will not be responsible for any loss of investment.
        </p>

        <p>
          A NON-FINANCIAL ADVICE: This Litepaper does not constitute investment advice, financial advice, trading
          advice, or a recommendation on the merits of purchasing tokens by MageBrotherhood, its affiliates, or their
          respective officers, directors, managers, agents, advisors, or consultants. This Litepaper should not be
          relied upon in connection with any other contract or purchasing decision. Nothing on Reddit, Discord,
          Telegram, Twitter, this Litepaper, or the MageBrotherhood website constitutes or should be construed as a
          promise or representation for the future. MageBrotherhood and its affiliates make no representations as to the
          likelihood or possibility that any actual or projected account allocation would achieve a certain investment
          outcome or goal. Please keep in mind that cryptocurrencies have the value that people attach to them. Invest
          with caution.
        </p>

        <p>
          The MageBrotherhood team offers no warranties or representations about the accuracy or timeliness of the
          information included in this Litepaper. Before making any financial decisions, you should consult with a
          certified adviser.
        </p>
      </Main>
    </PageLayout>
  );
}
