import { Gift01 } from "@untitled-ui/icons-react"
import TitleHeader from "../components/TitleHeader"
import { useFrappeGetDocList, useFrappeGetDoc } from "frappe-react-sdk"
import BlogCardDesktop from "../components/desktop/BlogCardDesktop"
import { useMediaQuery } from "react-responsive"
import { Link } from "react-router-dom"
import { SfIconCalendarToday } from "@storefront-ui/react"
import Breadcrumbs from "../components/Breadcrumbs"

export default function BlogPage(){
  const { data:dataBlog, isLoading:isLoadingBlogp, error:errorBlog } = useFrappeGetDocList('Blog Post', {
    fields: ['name', 'title', 'meta_image', 'published_on', 'post_display', 'blog_category'],
    filters: [['post_display', '=', 'Storefront']],
  })

  const { data:dataTest } = useFrappeGetDoc('Blog Post', 'okay-lets-test', {
    fields: ['name', 'content_json']
  })

  console.log(dataTest?.content_json)

  const isDesktop = useMediaQuery({ minWidth: 1024 });

  const BlogCard = ({title, image, date, link, ratio}) => {
    return (
      <Link to={link} className="w-full">
        <img src={`${import.meta.env.VITE_ERP_URL}${image}`} className='rounded-md w-full object-cover' style={{aspectRatio:ratio}}/>
        <h2 className='mt-4 whitespace-normal text-[#1C1C1C] text-sm font-bold'>{title}</h2>

        <p className='text-[#8A8A8A] mt-[5px] text-xs flex items-center'>
          <SfIconCalendarToday className="w-[11px] mr-[6px]"/>
          {date}
        </p>
      </Link>
    )
  }

  return (
    <>
      <TitleHeader title="บทความ" link="/"/>
      <main className="main-margintop desktop-sec lg:px-5 lg:py-10">
        <Breadcrumbs pages={[{
          name:'บทความ',
          href:''
        }]}/>
        <h2 className="header-title hidden lg:block mb-[48px]">บทความ</h2>
        {isDesktop ? (
          <div className={`hidden lg:grid grid-cols-3 gap-x-6 gap-y-10`}>
            {(dataBlog ?? []).map((d) => 
              <BlogCardDesktop key={d.name} image={d.meta_image} title={d.title} date={d.published_on} link={`/single-blog/${d.name}`} ratio='16/9' category={d.blog_category}/>
            )}
          </div>
        ) : (
          <div className="flex flex-col lg:hidden p-5 gap-y-[30px]">
            {(dataBlog ?? []).map((d) => 
              <BlogCard key={d.name} image={d.meta_image} title={d.title} date={d.published_on} link={`/single-blog/${d.name}`} ratio='16/9' category={d.blog_category}/>
            )}
          </div>
        )}
      </main>
    </>
  )
}