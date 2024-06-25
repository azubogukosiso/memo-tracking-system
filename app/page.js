import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from "next/navigation";
import Link from "next/link";
import Header from "@/app/(components)/HeaderComponent";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session?.user.role === "admin") {
    redirect("/admin");
  } else if (session?.user.role === "attendant") {
    redirect("/attendant");
  }

  return (
    <>
      <Header />
      <div className="border border-black"></div>
      <div className="mt-24 flex flex-col md:flex-row justify-around md:justify-evenly items-center mx-auto text-center md:text-left w-[90%]">
        <div className='md:w-[50%]'>
          <h1>Memo tracking made easy!</h1>
          <p className='mt-3 text-base'>
            Ditch the paper trail! Our memo tracker app streamlines communication by efficiently managing incoming and outgoing memos, saving you time and ensuring nothing gets lost in the shuffle.
          </p>
          <Link href='/search' className="inline-block mt-2 py-1 hover:bg-gray-200 border-black border-b-2 border-dashed cursor-pointer transition-all">Search for a Memo</Link> <br />
          <Link href='/login/attendant' className="inline-block mt-2 py-1 hover:bg-gray-200 border-black border-b-2 border-dashed cursor-pointer transition-all">Login as an Attendant</Link>
        </div>
        <div className="md:w-[30%] p-5">
          <svg width="332" height="331" viewBox="0 0 332 331" fill="none" className='w-full' xmlns="http://www.w3.org/2000/svg">
            <g id="Message Received 1">
              <g id="lines">
                <path id="Vector" d="M20.7832 177.548C20.5176 177.548 20.252 177.35 20.252 177.019C20.252 176.688 20.4512 176.489 20.7832 176.489L50.9952 174.834C51.2608 174.834 51.5264 175.033 51.5264 175.298C51.5264 175.562 51.3272 175.827 51.0616 175.827L20.7832 177.548Z" fill="#D1D3D4" />
                <path id="Vector_2" d="M93.2258 270.096C93.1594 270.096 93.0266 270.096 92.9602 270.03C92.761 269.897 92.6946 269.566 92.8274 269.368L107.635 246.396C107.767 246.198 108.099 246.132 108.299 246.264C108.498 246.396 108.564 246.727 108.431 246.926L93.6242 269.897C93.5578 270.03 93.425 270.096 93.2258 270.096Z" fill="#D1D3D4" />
                <path id="Vector_3" d="M37.2504 232.892C36.9848 232.892 36.7856 232.693 36.7856 232.362C36.7856 232.163 36.852 232.031 37.0512 231.965L59.5608 219.387C59.8264 219.254 60.092 219.321 60.2248 219.585C60.3576 219.85 60.2912 220.115 60.0256 220.247L37.516 232.825C37.3832 232.825 37.3168 232.892 37.2504 232.892Z" fill="#D1D3D4" />
                <path id="Vector_4" d="M204.18 58.256C204.114 58.256 204.047 58.256 203.981 58.256C203.715 58.1898 203.582 57.8588 203.649 57.594L209.16 42.8314C209.226 42.5666 209.558 42.4342 209.824 42.5004C210.09 42.5666 210.222 42.8976 210.156 43.1624L204.645 57.925C204.578 58.1236 204.379 58.256 204.18 58.256Z" fill="#D1D3D4" />
                <path id="Vector_5" d="M287.114 147.494C286.848 147.494 286.649 147.295 286.649 146.964C286.649 146.699 286.848 146.501 287.047 146.501L310.619 142.661C310.885 142.595 311.151 142.793 311.217 143.124C311.283 143.389 311.084 143.654 310.819 143.72L287.247 147.56L287.114 147.494Z" fill="#D1D3D4" />
                <path id="Vector_6" d="M286.516 244.94C286.383 244.94 286.25 244.874 286.117 244.741L271.31 226.139C271.111 225.941 271.177 225.61 271.377 225.477C271.576 225.345 271.841 225.345 272.041 225.543L286.848 244.146C287.047 244.344 286.981 244.675 286.781 244.874C286.715 244.874 286.582 244.94 286.516 244.94Z" fill="#D1D3D4" />
                <path id="Vector_7" d="M55.7096 86.8544C55.5768 86.8544 55.444 86.7882 55.3776 86.722L44.7536 77.6526C44.5544 77.454 44.488 77.1892 44.6872 76.9244C44.8864 76.7258 45.152 76.7258 45.3512 76.8582L55.9752 85.9276C56.1744 86.1262 56.2408 86.391 56.0416 86.6558C55.9752 86.7882 55.8424 86.8544 55.7096 86.8544Z" fill="#D1D3D4" />
              </g>
              <g id="character">
                <path id="Vector_8" d="M246.61 294.259L247.739 262.086L223.569 258.445L222.108 294.59" fill="white" />
                <path id="Vector_9" d="M222.108 295.12C221.843 295.12 221.644 294.855 221.644 294.59L223.104 258.445C223.104 258.18 223.37 257.981 223.636 257.981C223.636 257.981 223.636 257.981 223.702 257.981L247.872 261.622C248.137 261.689 248.27 261.887 248.27 262.152L247.208 294.259C247.208 294.524 247.008 294.722 246.743 294.722C246.743 294.722 246.743 294.722 246.676 294.722C246.411 294.722 246.212 294.458 246.212 294.193L247.274 262.549L224.1 259.041L222.64 294.59C222.64 294.855 222.374 295.053 222.108 295.12Z" fill="#231F20" />
                <path id="Vector_10" d="M128.75 280.357L156.372 247.72L181.14 253.745L149.6 285.852" fill="white" />
                <path id="Vector_11" d="M149.599 286.315C149.467 286.315 149.334 286.249 149.267 286.183C149.068 285.984 149.068 285.653 149.267 285.454L180.143 253.943L156.571 248.184L129.148 280.622C128.949 280.82 128.617 280.82 128.418 280.688C128.219 280.489 128.219 280.158 128.351 279.96L156.04 247.323C156.173 247.191 156.372 247.125 156.571 247.191L181.272 253.215C181.538 253.281 181.671 253.546 181.604 253.811C181.604 253.877 181.538 253.943 181.471 254.009L149.998 286.116C149.865 286.249 149.732 286.315 149.599 286.315Z" fill="#231F20" />
                <path id="Vector_12" d="M235.853 115.916C235.853 115.916 198.271 126.177 198.669 127.634C199.068 129.09 206.372 156.1 206.372 156.1L229.744 150.274L235.853 115.916Z" fill="#F99616" />
                <path id="Vector_13" d="M236.65 115.718C236.65 115.718 224.698 118.895 217.394 123.066C209.957 127.303 212.082 172.054 212.082 172.054L266.264 182.911C266.264 182.911 276.556 153.849 275.892 140.609C275.228 127.369 266.928 108.502 236.65 115.718Z" fill="#F99616" />
                <path id="Vector_14" d="M209.625 150.208C209.558 150.208 209.492 150.208 209.426 150.208C209.16 150.075 209.027 149.811 209.16 149.546C212.746 140.874 218.058 127.634 218.19 126.707C218.19 126.442 218.39 126.243 218.655 126.243C218.921 126.243 219.186 126.508 219.186 126.773C219.186 127.567 212.812 143.257 210.09 149.943C210.023 150.075 209.824 150.208 209.625 150.208Z" fill="#231F20" />
                <path id="Vector_15" d="M239.904 110.223L236.052 121.676C236.052 121.676 235.986 128.494 243.556 127.898C248.071 127.501 252.188 125.118 254.777 121.345L257.964 100.823C256.836 99.8296 256.039 98.4394 255.906 96.9168C255.773 95.7914 255.773 94.5998 255.972 93.4744C256.304 91.9518 256.902 90.4954 257.632 89.1052C253.98 88.377 250.793 86.9206 248.27 84.074C247.672 83.3458 247.141 82.6176 246.61 81.8232C246.344 81.4922 241.564 83.743 241.032 83.9416C238.708 85.1332 236.384 86.7882 234.99 89.039C233.861 90.9588 233.463 93.1434 233.064 95.2618C232.533 98.2408 232.201 101.286 232.201 104.265C232.4 110.157 239.904 110.223 239.904 110.223Z" fill="white" />
                <path id="Vector_16" d="M242.626 128.428C240.833 128.494 239.04 127.898 237.646 126.707C236.318 125.383 235.588 123.529 235.521 121.676C235.521 121.609 235.521 121.543 235.521 121.543L239.173 110.686C237.248 110.488 231.869 109.495 231.803 104.397C231.803 101.352 232.068 98.307 232.666 95.2618C232.998 93.2096 233.396 90.8926 234.658 88.8404C235.92 86.7882 238.044 84.9346 240.9 83.5444C246.544 80.764 246.876 81.2936 247.075 81.5584C247.54 82.2866 248.071 83.0148 248.668 83.743C250.926 86.2586 253.781 87.7812 257.765 88.5756C258.031 88.6418 258.23 88.9066 258.164 89.1714C258.164 89.2376 258.164 89.2376 258.097 89.3038C257.367 90.6278 256.836 92.018 256.437 93.5406C256.238 94.5998 256.172 95.7252 256.371 96.7844C256.504 98.1746 257.168 99.4986 258.23 100.425C258.363 100.558 258.429 100.69 258.429 100.889L255.242 121.411C255.242 121.477 255.242 121.543 255.176 121.609C252.586 125.515 248.336 128.031 243.622 128.494C243.29 128.428 242.958 128.428 242.626 128.428ZM236.584 121.742C236.65 123.331 237.248 124.853 238.376 125.979C239.572 127.104 241.298 127.567 243.556 127.369C247.872 126.972 251.856 124.721 254.312 121.146L257.433 101.021C256.304 99.962 255.574 98.5056 255.441 96.983C255.242 95.7914 255.308 94.5998 255.508 93.4082C255.84 92.0842 256.304 90.7602 256.968 89.5024C253.117 88.6418 250.196 86.9868 247.938 84.4712C247.407 83.8092 246.876 83.081 246.411 82.419C244.684 83.0148 243.024 83.743 241.364 84.5374C239.505 85.4642 236.982 87.053 235.521 89.4362C234.392 91.2898 234.06 93.4744 233.662 95.5266C233.131 98.5056 232.799 101.485 232.799 104.464C232.865 109.693 239.572 109.826 239.904 109.826C240.169 109.826 240.368 110.024 240.368 110.355C240.368 110.422 240.368 110.488 240.368 110.488L236.584 121.742Z" fill="#231F20" />
                <path id="Vector_17" d="M253.98 98.969C254.312 98.1084 254.976 97.4464 255.706 96.983C256.437 96.5858 257.3 96.321 258.097 96.2548C258.562 96.1224 259.026 96.1224 259.491 96.2548C259.823 96.3872 260.089 96.5196 260.354 96.7182C260.952 97.1816 261.417 97.7774 261.616 98.5056C261.682 99.1014 261.616 99.7634 261.417 100.359C261.218 101.021 260.952 101.617 260.62 102.213C259.159 104.596 255.972 105.324 253.648 103.802C253.648 103.802 253.582 103.802 253.582 103.735" fill="white" />
                <path id="Vector_18" d="M256.304 105.059C255.242 105.059 254.179 104.728 253.25 104.133C253.051 104 252.984 103.669 253.117 103.471C253.25 103.272 253.582 103.206 253.781 103.338C255.906 104.728 258.761 104.133 260.155 102.014C260.155 102.014 260.155 101.948 260.222 101.948C260.554 101.418 260.819 100.823 260.952 100.227C261.151 99.6972 261.218 99.1676 261.151 98.638C260.952 98.0422 260.62 97.4464 260.089 97.1154C259.89 96.9168 259.691 96.8506 259.425 96.7182C259.027 96.652 258.628 96.652 258.296 96.7844C257.499 96.9168 256.769 97.1154 256.039 97.5126C255.375 97.9098 254.777 98.5056 254.511 99.2338C254.379 99.4986 254.113 99.631 253.847 99.4986C253.582 99.3662 253.449 99.1014 253.582 98.8366C253.98 97.9098 254.711 97.1154 255.574 96.5858C256.371 96.1886 257.234 95.8576 258.163 95.7914C258.695 95.659 259.226 95.659 259.757 95.7914C260.155 95.9238 260.487 96.1224 260.753 96.321C261.483 96.8506 262.015 97.5788 262.214 98.4394C262.28 99.1014 262.214 99.8296 262.015 100.492C261.815 101.22 261.55 101.882 261.151 102.478C260.023 104.066 258.23 105.059 256.304 105.059Z" fill="#231F20" />
                <path id="Vector_19" d="M237.978 116.313C240.766 116.578 243.555 115.85 245.879 114.327C249.598 111.746 249.797 108.436 249.797 108.436C246.676 109.826 243.356 110.422 239.97 110.289L237.978 116.313Z" fill="#231F20" />
                <path id="Vector_20" d="M239.107 116.843C238.708 116.843 238.31 116.843 237.912 116.777C237.779 116.777 237.646 116.644 237.58 116.578C237.513 116.446 237.513 116.313 237.513 116.181L239.439 110.157C239.505 109.958 239.704 109.826 239.97 109.826C243.29 109.958 246.544 109.362 249.532 108.038C249.664 107.972 249.864 107.972 250.063 108.038C250.196 108.105 250.328 108.303 250.262 108.502C250.262 108.634 249.996 112.077 246.145 114.725C244.087 116.115 241.63 116.843 239.107 116.843ZM238.642 115.85C241.099 115.982 243.556 115.254 245.614 113.93C247.274 112.871 248.536 111.216 249.133 109.296C246.344 110.355 243.356 110.885 240.302 110.819L238.642 115.85Z" fill="#231F20" />
                <path id="Vector_21" d="M245.016 90.6278C245.016 90.6278 240.102 95.5266 240.833 96.7182C241.563 97.9098 244.219 97.7112 244.219 97.7112" fill="white" />
                <path id="Vector_22" d="M243.821 98.1746C242.958 98.1746 241.099 98.0422 240.368 96.9168C239.571 95.5928 242.692 92.1504 244.618 90.2306C244.817 90.032 245.149 90.032 245.348 90.2306C245.547 90.4292 245.547 90.7602 245.348 90.8926C243.024 93.2758 241.032 95.7914 241.231 96.3872C241.63 97.0492 243.223 97.1816 244.153 97.1154C244.419 97.1154 244.684 97.314 244.684 97.5788C244.684 97.8436 244.485 98.1084 244.219 98.1084L243.821 98.1746Z" fill="#231F20" />
                <path id="Vector_23" d="M237.513 100.492L247.008 100.359C247.008 100.359 246.61 106.781 241.032 107.112C235.454 107.443 237.513 100.492 237.513 100.492Z" fill="#231F20" />
                <path id="Vector_24" d="M247.274 90.6278C247.54 90.0982 248.071 89.701 248.668 89.6348C249.731 89.4362 250.328 90.694 250.328 90.694" fill="white" />
                <path id="Vector_25" d="M250.262 91.2236C250.062 91.2236 249.863 91.0912 249.797 90.9588C249.797 90.9588 249.399 90.032 248.668 90.1644C248.27 90.2306 247.871 90.4292 247.672 90.8264C247.606 91.0912 247.274 91.2236 247.008 91.1574C246.743 91.0912 246.61 90.8264 246.676 90.5616C247.008 89.8334 247.672 89.3038 248.469 89.2376C249.399 89.1714 250.328 89.701 250.66 90.6278C250.793 90.8926 250.66 91.1574 250.395 91.2898C250.395 91.1574 250.328 91.2236 250.262 91.2236Z" fill="#231F20" />
                <path id="Vector_26" d="M238.442 89.7672C238.708 89.2376 239.239 88.8404 239.837 88.7742C240.899 88.5756 241.497 89.8334 241.497 89.8334" fill="white" />
                <path id="Vector_27" d="M241.497 90.363C241.298 90.363 241.099 90.2306 241.032 90.0982C241.032 90.0982 240.634 89.1714 239.903 89.3038C239.505 89.37 239.107 89.5686 238.907 89.9658C238.841 90.2306 238.509 90.363 238.243 90.2968C237.978 90.2306 237.845 89.9658 237.911 89.701C238.243 88.9728 238.907 88.4432 239.638 88.377C240.567 88.3108 241.497 88.8404 241.829 89.7672C241.962 90.032 241.829 90.2968 241.563 90.4292C241.63 90.363 241.563 90.363 241.497 90.363Z" fill="#231F20" />
                <path id="Vector_28" d="M265.202 182.249L257.433 285.454L128.418 259.173L214.14 171.458L265.202 182.249Z" fill="#231F20" />
                <path id="Vector_29" d="M209.625 106.516L58.1001 131.672L124.766 64.1478L209.625 106.516Z" fill="#231F20" />
                <path id="Vector_30" d="M58.1002 132.201C57.901 132.201 57.7682 132.069 57.6354 131.937C57.5026 131.738 57.569 131.539 57.7018 131.341L124.367 63.8168C124.5 63.6844 124.766 63.6182 124.965 63.7506L209.824 106.119C210.023 106.185 210.156 106.45 210.09 106.648C210.09 106.847 209.891 107.045 209.691 107.045L58.1666 132.201H58.1002ZM124.899 64.7436L59.561 130.944L208.098 106.251L124.899 64.7436Z" fill="#231F20" />
                <path id="Vector_31" d="M223.635 207.868L80.6761 233.487L58.2993 132.599L209.758 107.376L223.635 207.868Z" fill="#231F20" />
                <path id="Vector_32" d="M80.6761 233.951C80.4105 233.951 80.2113 233.818 80.2113 233.554L57.8345 132.665C57.8345 132.532 57.8345 132.4 57.9009 132.268C57.9673 132.135 58.1001 132.069 58.2329 132.069L209.691 106.913C209.824 106.913 209.957 106.913 210.09 106.979C210.222 107.045 210.289 107.178 210.289 107.31L224.166 207.736C224.233 208 224.034 208.265 223.768 208.265L80.8089 233.885L80.6761 233.951ZM58.8969 132.996L81.0745 232.958L223.104 207.471L209.359 107.972L58.8969 132.996Z" fill="#231F20" />
                <path id="Vector_33" d="M92.6946 200.056C92.6946 200.056 66.3338 119.028 53.7178 94.4012L194.818 56.0714L203.583 181.454L92.6946 200.056Z" fill="#F99616" />
                <path id="Vector_34" d="M78.4184 108.634C78.1528 108.634 77.8872 108.436 77.8872 108.171C77.8872 107.906 78.02 107.707 78.2856 107.707L182.069 80.8964C182.334 80.8302 182.6 80.9626 182.666 81.2274C182.733 81.4922 182.6 81.757 182.334 81.8232L78.5512 108.634C78.4848 108.634 78.4848 108.634 78.4184 108.634Z" fill="white" />
                <path id="Vector_35" d="M82.8009 125.581C82.5353 125.581 82.3361 125.449 82.3361 125.184C82.2697 124.919 82.4689 124.655 82.7345 124.588L183.198 102.147C183.463 102.08 183.729 102.279 183.795 102.544C183.862 102.809 183.663 103.073 183.397 103.14L82.9337 125.581H82.8009Z" fill="white" />
                <path id="Vector_36" d="M91.4331 141.469C91.1675 141.469 90.9019 141.271 90.9019 141.006C90.9019 140.741 91.1011 140.543 91.3003 140.476L187.381 121.874C187.647 121.808 187.912 122.007 187.979 122.271C188.045 122.536 187.846 122.735 187.58 122.801L91.4995 141.403L91.4331 141.469Z" fill="white" />
                <path id="Vector_37" d="M96.0148 161.727C95.7492 161.727 95.55 161.528 95.55 161.329C95.4836 161.065 95.6828 160.8 95.9484 160.734L187.116 145.971C187.381 145.905 187.647 146.103 187.713 146.368C187.78 146.633 187.58 146.898 187.315 146.964L96.1476 161.727H96.0148Z" fill="white" />
                <path id="Vector_38" d="M144.022 171.59L58.2993 132.599L80.6761 233.487L223.635 207.868L209.758 107.376L144.022 171.59Z" fill="white" />
                <path id="Vector_39" d="M80.6762 233.951C80.4106 233.951 80.2114 233.818 80.2114 233.554L57.8346 132.665C57.7682 132.4 57.9674 132.135 58.233 132.069C58.2994 132.069 58.4322 132.069 58.4986 132.069L143.889 170.995L209.359 107.045C209.559 106.847 209.891 106.847 210.023 107.045C210.09 107.112 210.156 107.244 210.156 107.31L224.034 207.736C224.1 208 223.901 208.265 223.635 208.265L80.7426 233.885L80.6762 233.951ZM59.0298 133.459L81.0746 232.958L223.104 207.471L209.426 108.436L144.42 171.921C144.287 172.054 144.022 172.12 143.889 171.988L59.0298 133.459Z" fill="#231F20" />
                <path id="Vector_40" d="M223.635 207.868L80.7427 233.487L144.022 171.59L223.635 207.868Z" fill="white" />
                <path id="Vector_41" d="M80.7426 233.951C80.477 233.951 80.2778 233.752 80.2778 233.421C80.2778 233.289 80.3442 233.156 80.4106 233.09L143.756 171.193C143.889 171.061 144.155 170.995 144.287 171.127L223.901 207.338C224.167 207.471 224.233 207.736 224.167 208C224.1 208.133 223.967 208.265 223.835 208.265L80.8754 233.885L80.7426 233.951ZM144.155 172.186L82.2034 232.693L221.975 207.603L144.155 172.186Z" fill="#231F20" />
                <path id="Vector_42" d="M223.635 207.868L80.7427 233.487L144.022 171.59L223.635 207.868Z" fill="white" />
                <path id="Vector_43" d="M80.7426 233.951C80.477 233.951 80.2778 233.752 80.2778 233.421C80.2778 233.289 80.3442 233.156 80.4106 233.09L143.756 171.193C143.889 171.061 144.155 170.995 144.287 171.127L223.901 207.338C224.167 207.471 224.233 207.736 224.167 208C224.1 208.133 223.967 208.265 223.835 208.265L80.8754 233.885L80.7426 233.951ZM144.155 172.186L82.2034 232.693L221.975 207.603L144.155 172.186Z" fill="#231F20" />
                <path id="Vector_44" d="M259.89 132.466C259.89 132.466 184.127 170.796 172.574 172.981C161.02 175.165 147.342 171.326 147.873 174.636C148.404 177.946 155.044 179.534 155.044 179.534C155.044 179.534 134.195 182.844 135.257 185.029C136.319 187.214 150.064 184.499 150.064 184.499C150.064 184.499 133.066 189.398 136.851 191.649C140.635 193.9 152.787 188.935 152.787 188.935C152.787 188.935 134.659 198.203 139.639 198.799C144.619 199.394 153.384 194.429 153.384 194.429C153.384 194.429 139.639 201.579 145.151 202.109C150.662 202.638 232.467 173.643 259.89 157.225" fill="white" />
                <path id="Vector_45" d="M145.283 202.506H145.084C144.022 202.373 143.49 202.042 143.358 201.447C143.225 200.586 144.42 199.394 146.08 198.137C143.822 198.865 141.498 199.394 139.573 199.196C138.842 199.13 138.378 198.799 138.311 198.335C138.046 196.879 142.826 193.834 147.209 191.318C143.424 192.377 138.842 193.304 136.651 192.046C136.12 191.848 135.788 191.318 135.854 190.722C136.054 189.2 139.971 187.412 143.756 186.022C139.772 186.485 135.522 186.684 134.858 185.228C134.726 184.963 134.726 184.632 134.858 184.433C135.854 182.447 147.607 180.329 152.919 179.402C150.861 178.608 147.806 177.085 147.408 174.702C147.342 174.305 147.474 173.841 147.74 173.576C148.67 172.517 151.724 172.65 156.239 172.914C161.02 173.179 166.996 173.51 172.507 172.517C183.862 170.399 258.894 132.4 259.69 132.069C259.956 131.937 260.222 132.069 260.354 132.268C260.487 132.532 260.354 132.797 260.155 132.93C257.034 134.518 184.194 171.326 172.706 173.51C167.062 174.569 161.02 174.238 156.173 173.974C152.521 173.775 149.134 173.576 148.47 174.305C148.404 174.371 148.404 174.503 148.404 174.636C148.802 177.085 153.45 178.74 155.177 179.137C155.442 179.203 155.642 179.468 155.575 179.733C155.509 179.932 155.376 180.064 155.177 180.13C146.279 181.52 136.452 183.771 135.788 184.963C136.452 185.956 142.76 185.559 150.064 184.102C150.33 184.036 150.595 184.168 150.662 184.433C150.728 184.698 150.595 184.963 150.33 185.029C144.022 186.883 137.116 189.597 136.917 190.921C136.917 191.053 137.116 191.186 137.249 191.252C140.237 192.973 149.466 189.862 152.72 188.471C152.986 188.339 153.251 188.471 153.384 188.736C153.517 189.001 153.384 189.266 153.118 189.398C146.611 192.708 139.573 197.011 139.374 198.203C139.506 198.269 139.639 198.269 139.772 198.269C143.49 198.666 149.533 195.82 152.056 194.562L153.185 193.966C153.45 193.834 153.716 193.966 153.849 194.165C153.982 194.429 153.915 194.694 153.65 194.827C153.583 194.893 153.118 195.158 152.388 195.489C147.474 198.137 144.154 200.718 144.354 201.314C144.354 201.314 144.486 201.513 145.217 201.579C147.607 201.778 167.793 195.422 194.154 185.559C208.297 180.263 242.891 166.824 259.69 156.762C259.956 156.629 260.222 156.695 260.354 156.96C260.487 157.225 260.421 157.49 260.155 157.622C233.662 173.378 152.986 202.506 145.283 202.506Z" fill="#231F20" />
                <path id="Vector_46" d="M245.879 164.904C245.879 164.904 234.193 137.564 235.255 137.166C236.318 136.769 258.694 122.205 260.487 123.264C262.28 124.324 269.252 145.508 267.061 151.73C264.87 157.953 245.879 164.904 245.879 164.904Z" fill="#F99616" />
                <path id="Vector_47" d="M248.801 164.97C248.602 164.97 248.403 164.838 248.336 164.639C248.27 164.375 248.403 164.11 248.668 164.044C248.801 163.977 265.069 158.483 271.51 150.34C271.709 150.142 272.041 150.208 272.24 150.406C272.373 150.539 272.373 150.737 272.307 150.936C265.667 159.343 249.664 164.772 249 164.97C248.867 164.97 248.867 164.97 248.801 164.97Z" fill="#231F20" />
                <path id="Vector_48" d="M261.815 105.523C261.55 105.523 261.351 105.258 261.351 104.993C261.351 104.795 261.483 104.596 261.683 104.53C265.401 103.404 268.389 100.69 269.783 97.1816C271.244 93.6068 271.576 89.701 270.779 85.9276C270.248 82.2866 268.655 78.8442 266.198 76.0638C263.542 73.2834 259.823 71.7608 256.503 72.158L255.773 72.2242C255.242 72.2904 254.711 72.3566 254.179 72.3566C253.515 72.3566 252.851 72.2242 252.187 72.0918L251.789 72.0256C240.501 69.7748 229.545 77.0568 227.287 88.3108C226.69 91.2898 226.756 94.4012 227.487 97.3802C227.752 98.307 228.283 99.8958 229.479 100.028C229.744 100.028 229.943 100.227 229.943 100.558C229.943 100.889 229.744 101.021 229.412 101.021C229.346 101.021 229.346 101.021 229.279 101.021C227.951 100.889 226.955 99.631 226.424 97.645C223.503 85.9938 230.674 74.2102 242.36 71.2974C245.481 70.503 248.735 70.4368 251.922 71.0988L252.32 71.165C253.383 71.496 254.511 71.496 255.574 71.2974C255.839 71.2312 256.105 71.2312 256.304 71.165C260.023 70.7678 264.007 72.3566 266.862 75.4018C269.451 78.3146 271.111 81.8894 271.709 85.729C272.506 89.701 272.174 93.8054 270.647 97.5788C268.92 101.551 265.667 104.53 261.882 105.523H261.815Z" fill="#231F20" />
                <path id="Vector_49" d="M254.179 71.8932C254.179 71.8932 259.226 68.1198 267.459 70.172C275.693 72.2242 278.814 87.1192 271.111 95.1956C271.111 95.1956 272.306 73.2834 254.179 71.8932Z" fill="#231F20" />
                <path id="Vector_50" d="M283.462 118.829C279.146 118.432 275.427 117.042 272.705 114.791C269.518 112.143 267.659 108.237 267.858 104.53C267.858 104.265 268.123 104.066 268.389 104.066C268.655 104.066 268.854 104.331 268.854 104.596C268.655 107.972 270.381 111.613 273.369 113.996C275.759 115.85 278.615 117.108 281.603 117.571C280.806 116.644 280.275 115.519 280.075 114.261C279.943 112.408 280.208 110.554 280.939 108.833C282.134 105.92 283.528 103.14 285.188 100.492C287.645 96.3872 289.903 92.4814 290.434 87.9136C291.43 79.0428 285.055 71.0326 276.158 70.0396C274.099 69.841 272.107 69.9734 270.115 70.503C269.85 70.5692 269.584 70.4368 269.518 70.172C269.451 69.9072 269.584 69.6424 269.85 69.5762C279.013 67.0606 288.442 72.489 290.965 81.6246C291.563 83.743 291.695 85.8614 291.43 88.046C290.899 92.8124 288.442 96.983 286.051 101.021C284.391 103.603 282.997 106.383 281.868 109.23C281.204 110.753 280.939 112.474 281.071 114.129C281.204 115.718 282.2 117.174 283.661 117.836C283.927 117.968 284.059 118.233 283.927 118.498C283.86 118.697 283.661 118.829 283.462 118.829Z" fill="#231F20" />
                <path id="Vector_51" d="M238.774 141.205C238.509 141.205 238.243 141.006 238.243 140.741C238.243 140.543 238.31 140.41 238.509 140.344L258.562 128.031C258.761 127.898 259.093 127.965 259.226 128.163C259.358 128.362 259.292 128.693 259.093 128.825L239.04 141.138C238.974 141.138 238.841 141.205 238.774 141.205Z" fill="#231F20" />
                <path id="Vector_52" d="M242.36 199.461C242.294 199.461 242.227 199.461 242.094 199.394C241.895 199.262 241.762 198.997 241.895 198.732L252.519 179.402C252.652 179.203 252.851 179.071 253.117 179.137C253.316 179.203 253.515 179.402 253.515 179.601V196.746C253.515 197.011 253.316 197.276 252.984 197.276C252.652 197.276 252.453 197.077 252.453 196.746V181.52L242.758 199.13C242.692 199.394 242.559 199.461 242.36 199.461Z" fill="white" />
              </g>
              <g id="stars">
                <path id="Vector_53" d="M213.675 68.7818C213.675 68.7818 211.617 76.5934 205.043 76.7258C205.043 76.7258 211.949 78.6456 213.409 85.1332C213.409 85.1332 215.269 79.2414 221.444 77.6526C221.444 77.7188 215.866 75.799 213.675 68.7818Z" fill="#D1D3D4" />
                <path id="Vector_54" d="M25.2319 127.898C25.2319 127.898 30.4775 135.379 25.8295 141.138C25.8295 141.138 32.5359 136.571 39.2423 140.079C39.2423 140.079 35.4575 134.187 38.5783 127.7C38.5783 127.7 32.9343 131.142 25.2319 127.898Z" fill="#D1D3D4" />
                <path id="Vector_55" d="M72.1769 66.9944C72.1769 66.9944 73.3057 80.0358 63.3457 83.8092C63.3457 83.8092 74.9657 83.0148 80.6761 92.0842C80.6761 92.0842 80.2777 82.088 88.7769 76.3286C88.8433 76.3286 79.3481 76.5272 72.1769 66.9944Z" fill="#D1D3D4" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      <div className='pb-3 md:mb-0 mt-[75px] flex justify-end items-center'>
        <Link href='/guide' className="py-1 hover:bg-gray-200 border-black border-b-2 border-dashed cursor-pointer transition-all">User Guide</Link>
        <span className="mx-3"></span>
        <Link href='mailto:azuboguko@gmail.com' target="_blank" className="py-1 hover:bg-gray-200 border-black border-b-2 border-dashed cursor-pointer transition-all">Feedback</Link>
      </div>
    </>
  )
}
