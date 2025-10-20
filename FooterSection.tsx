import svgPaths from "./svg-fqfgn24e56";
import imgImage14 from "figma:asset/570327f59dba361aedbc60646924ed1d638be94f.png";
import imgImage15 from "figma:asset/686b9ee2647e2446e4b1173d54ab866891971f4e.png";
import imgImage16 from "figma:asset/fe584820f4973d98b972a898f9eea618b51dc683.png";
import imgImage17 from "figma:asset/99c478e0a708cfce46737da563f1110d66a894aa.png";

function Instagram() {
  return (
    <div className="absolute h-[35px] left-[701px] top-[168px] w-[38px]" data-name="Instagram">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 35">
        <g id="Instagram">
          <rect fill="#161616" height="35" width="38" />
          <path d={svgPaths.pdd21c80} id="Icon" stroke="var(--stroke-0, #F19EDC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

export default function FooterSection() {
  return (
    <div className="bg-[#161616] relative size-full" data-name="Footer section">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[10px] items-start p-[10px] relative size-full">
          <p className="absolute font-['Julius_Sans_One:Regular',_sans-serif] leading-[1.5] left-[414px] not-italic text-[#d7cf7e] text-[24px] text-nowrap top-[339px] whitespace-pre">© 2024 Restaurant ZEDUC - Tous droits réservés</p>
          <div className="absolute font-['Julius_Sans_One:Regular',_'Noto_Sans:Regular',_sans-serif] h-[143px] leading-[1.5] left-[28px] text-[#e8b954] text-[20px] top-[168px] w-[460px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
            <p className="mb-0">{`📍Cite la terrase, DOuala yansoki `}</p>
            <p className="mb-0">{`📞 +237 623 45 67 89 `}</p>
            <p className="mb-0">{`✉️ reservation@zeducspace.com `}</p>
            <p>🕐 Ouvert du lundi au dimanche, 15h - 21h</p>
          </div>
          <p className="absolute font-['Julius_Sans_One:Regular',_sans-serif] h-[41px] leading-[1.5] left-[172px] not-italic text-[#e8b954] text-[20px] top-[119px] w-[130px]">INFO UTILE</p>
          <p className="absolute font-['Julius_Sans_One:Regular',_sans-serif] h-[41px] leading-[1.5] left-[673px] not-italic text-[#e8b954] text-[20px] top-[119px] w-[93px]">COntact</p>
          <div className="absolute h-0 left-[213px] top-[100px] w-[1014px]">
            <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1014 2">
                <path d="M-6.26018e-05 1H1014" id="Vector 1" stroke="var(--stroke-0, #D7CF7E)" />
              </svg>
            </div>
          </div>
          <Instagram />
          <div className="absolute h-[35px] left-[702px] rounded-[12px] top-[213px] w-[36px]" data-name="image 14">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[12px] size-full" src={imgImage14} />
          </div>
          <div className="absolute h-[34px] left-[695px] rounded-[12px] top-[259px] w-[49px]" data-name="image 15">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[12px] size-full" src={imgImage15} />
          </div>
          <p className="absolute font-['Julius_Sans_One:Regular',_sans-serif] h-[41px] leading-[1.5] left-[1123px] not-italic text-[#e8b954] text-[20px] top-[119px] w-[207px]">Moyen de paiement</p>
          <div className="absolute h-[70px] left-[1165px] rounded-[82px] top-[168px] w-[124px]" data-name="image 16">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[82px] size-full" src={imgImage16} />
          </div>
          <div className="absolute h-[64px] left-[1165px] rounded-[82px] top-[271px] w-[124px]" data-name="image 17">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[82px] size-full" src={imgImage17} />
          </div>
        </div>
      </div>
    </div>
  );
}