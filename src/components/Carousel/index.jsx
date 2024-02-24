import { useEffect, useState } from "react";
import { callCategory } from "../../services/api";

const Carousel = () => {
    const [listCategory, setListCategory] = useState([]);

    useEffect(() => {
        const initCategory = async () => {
            const res = await callCategory();
            if(res.data) {
                const data = res.data.map(item => {
                    return {code: item.code, name: item.name}
                })
                setListCategory(data);
            }
        }
        initCategory();
});
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {listCategory?.map((item, index) => {
            return (

                <div className="grid grid-rows-3 grid-flow-col gap-4">
                    <div className="row-span-3">01</div>
                    <div className="col-span-2">02</div>
                    <div className="row-span-2 col-span-2">03</div>
                </div>
            )
})}

            </div>
    )
}

export default Carousel;