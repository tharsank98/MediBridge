import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const Header = () => {
    return (
        <div className='flex flex-col md:flex-row flex-wrap bg-slate-800 rounded-lg px-6 md:px-10 lg:px-20 mt-5 m-10'>

            {/*-------Left Side---------*/}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vW] md:mb-[-30px]'>
                <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
                    Book Your Appointment<br />and Order Medicines Online
                </p>
                <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                    <img className='w-28' src='/assets/group_profiles.png' alt='group_profiles'></img>
                    <p>Simply browse through our extensive list of trusted doctors,<br className='hidden sm:block' />and Order your Medicines.</p>
                </div>
                <a href="/doctors" className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300 relative'>
                    Book appointment
                    <ArrowForwardIosIcon className='w-3 animate-arrowMove' />
                </a>
                <a href="/pharmacy" className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300 relative'>
                    Order Medicines
                    <ArrowForwardIosIcon className='w-3 animate-arrowMove' />
                </a>
            </div>

            {/*-------Right Side---------*/}
            <div className='md:w-1/2 relative'>
                <img className='w-full md:absolute bottom-0 h-auto rounded-lg mb-12' src='/assets/header_img.png' alt='header_img'></img>
            </div>
        </div>
    );
};