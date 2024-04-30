import { getFooterList } from "../utilites/getFooterList"
import FooterList from "./footerlist";
import { TfiYoutube } from "react-icons/tfi";
import { TfiTwitterAlt } from "react-icons/tfi";
import { IoLogoFacebook } from "react-icons/io";
import playstore from "../../Assets/google_play_store.webp"
import iosplaystore from "../../Assets/ios_app_store_icon.webp"
import { Link } from "react-router-dom";
function Footer(){
    const footerList = getFooterList();
    return(<div className="bg-[#003380] text-white">
      <div className="flex justify-around pt-7">
        {footerList.map((data, i) => (
          <FooterList key={i} {...data} />
        ))}
      </div>
      <div className="flex py-9 px-16 justify-between w-[65%]">
        <div>
          <h2 className="text-base font-bold pb-2">FOLLOW US</h2>
          <div className="flex gap-2">
            <Link to="https://www.facebook.com/reliancedigital/" target="_blank">
              <IoLogoFacebook fontSize={25}/>
            </Link>
            <Link to="https://twitter.com/reliancedigital" target="_blank"><TfiTwitterAlt fontSize={25}/></Link>
            <Link to="https://www.youtube.com/reliancedigital" target="_blank"><TfiYoutube fontSize={25}/></Link>
          </div>
        </div>
        <div>
          <h2 className="text-base font-bold pb-2">EXPERIENCE RELIANCE DIGITAL APP ON MOBILE</h2>
          <div className="flex gap-2">
            <Link to="https://play.google.com/store/apps/details?id=in.digital.reliance" target="_blank">
              <img src={playstore} className="w-[120px]"/>
            </Link>
            <Link to="https://apps.apple.com/in/app/reliance-digital-shopping-app/id1513379107" target="_blank">
              <img src={iosplaystore} className="w-[120px]"/>
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center text-sm bg-[#0A244A]">
        <div className="underline-offset-8 font-bold pt-4">Disclaimer</div>
        <div className="py-5 px-14 ">Product prices, offers and availability are subject to change from time to time. All prices are inclusive of taxes. Product colours & images are only for illustration and they may not exactly match with the actual product. Product specs are subject to change & may vary from actual product. While every care is taken to avoid inaccuracies in content, these are provided as is, without warranty of any kind</div>
        <div className="py-3 border-y border-slate-500"> © 2024 Reliance Digital. All Rights Reserved.</div>
      </div>
    </div>)
}

export default Footer

