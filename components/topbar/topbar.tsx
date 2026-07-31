import GlobalSearch from "./globalSearch";
import TopbarPageTitle from "./pageTitle";
import OpenSidebarButton from "../buttons/bars/openSidebarButton";
import SwitchThemesButton from "../buttons/bars/switchThemes";

export default function Topbar(){
    return (
        <div className="w-full border-b border-(--border) h-16 flex items-center justify-between px-5">
            <TopbarPageTitle />

            <div className="flex items-center gap-3">
                <GlobalSearch />
                
                <SwitchThemesButton />
                <OpenSidebarButton />
            </div>
        </div>
    )
}