import Link from "next/link";

function Form({ type, post, setPost, submitting, handleSubmit }) {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left blue_gradient">{type} Post</h1>
      <p className="desc text-left mex-w-md">
        {type} and Share amazing prompts with the world, and let your
        imagination run wild with any AI-powred platform
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label>
          <span className="font-satoshi font-semibold text-gray-700">
            Your Ai Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            required
            placeholder="Write your prompt here..."
            className="form_textarea"></textarea>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-gray-700">
            Tag
            {" "}
            <span>(#product,#webdevelopment,#idea)</span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            required
            placeholder="#tag"
            className="form_input"
            ></input>
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href={"/"} className='text-gray-500 text-sm'>
            Cancel
          </Link>
          <button type="submit"
          disabled={submitting}
          className="bx-5 by-1.5 text-sm bg-primary-orange rounded-full text-white">
            {submitting ? `${type}...`:type}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Form;
