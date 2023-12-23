
import  Feed  from '@src/components/Feed';

const Home = () => {
  return (
    <section className="w-full pt-6 flex-center flex-col">
        <h1 className="head_text text-center">
            Discover And Share
        <br className="max-md:hidden"/>
        <span className="orange_gradient text-center">Ai-Powred Prompts</span></h1>
        <p className="desc text-center">
            Prompts Land is an oprn-source AI prompting 
            tool for modern world to discover , create 
            and share creative prompts.
        </p>
        <Feed />
    </section>
  )
}

export default Home