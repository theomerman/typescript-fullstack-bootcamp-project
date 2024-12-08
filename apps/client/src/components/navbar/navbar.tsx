import { templateName } from '../../App'

export function NavBar(prop: templateName) {
    return (
        <nav
            className={`${prop.gridTemplateName} bg-[#171717] text-[#808080] px-3`}
        >
            <ul className="flex flex-row flex-nowrap justify-between h-16 items-center gap-3">
                <section className="flex flex-row flex-nowrap gap-3 text-sm">
                    <li className="hover:cursor-pointer">ACME STORE</li>
                    <li className="hover:cursor-pointer">All</li>
                    <li className="hover:cursor-pointer">Shirts</li>
                    <li className="hover:cursor-pointer">Stickers</li>
                </section>
                <li>
                    <search className="">
                        <input
                            className="w-full rounded border bg-black border-[#808080] h-8 px-3 text-[#808080]"
                            type="text"
                            placeholder="Search for products..."
                        />
                    </search>
                </li>
                <li>
                    <button>cart</button>
                </li>
            </ul>
        </nav>
    )
}
