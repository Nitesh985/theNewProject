import '../contact.css'

function Contact(){

  return( <div class="all">
    <h1>Contact us</h1>
    <div class="container">
    <div class="info">
        <h5>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" class="injected-svg" data-src="/icons/location-01-stroke-rounded.svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#ffffff">
                <path d="M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z" stroke="#ffffff" stroke-width="1.5"></path>
                <path d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z" stroke="#ffffff" stroke-width="1.5"></path>
                </svg>Address</h5>
            <h6>Pokhara-08,Phirke</h6>
           <h5>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" class="injected-svg" data-src="/icons/call-stroke-rounded.svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#ffffff">
                <path d="M3.77762 11.9424C2.8296 10.2893 2.37185 8.93948 2.09584 7.57121C1.68762 5.54758 2.62181 3.57081 4.16938 2.30947C4.82345 1.77638 5.57323 1.95852 5.96 2.6524L6.83318 4.21891C7.52529 5.46057 7.87134 6.08139 7.8027 6.73959C7.73407 7.39779 7.26737 7.93386 6.33397 9.00601L3.77762 11.9424ZM3.77762 11.9424C5.69651 15.2883 8.70784 18.3013 12.0576 20.2224M12.0576 20.2224C13.7107 21.1704 15.0605 21.6282 16.4288 21.9042C18.4524 22.3124 20.4292 21.3782 21.6905 19.8306C22.2236 19.1766 22.0415 18.4268 21.3476 18.04L19.7811 17.1668C18.5394 16.4747 17.9186 16.1287 17.2604 16.1973C16.6022 16.2659 16.0661 16.7326 14.994 17.666L12.0576 20.2224Z" stroke="#ffffff" stroke-width="1.5" stroke-linejoin="round"></path>
                </svg>Phone</h5>
                <h6>9817194571</h6>

            <h5>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" class="injected-svg" data-src="/icons/mail-01-stroke-rounded.svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#ffffff">
                    <path d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6" stroke="#ffffff" stroke-width="1.5" stroke-linejoin="round"></path>
                    <path d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z" stroke="#ffffff" stroke-width="1.5" stroke-linejoin="round"></path>
                    </svg>
                    Email
            </h5>
            <h6>recepmvb096@gmail.com</h6>
    </div>
    <div class="inputbox">
         <input type="text" placeholder="Full Name"/>
         <input type="email" placeholder="Email"/>
         <input type="text" placeholder="Enter a message"/>
         <button class="Submitbtn">Submit</button>
    </div>

</div>

</div>)
}

export default Contact