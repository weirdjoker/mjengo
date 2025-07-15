const testimonials = [
    {name:'John,Project Owner' , 
        quote: 'Mjengo helped me find reliable builders and track expenses effortlessly'
    }

]
const Testimonials = () => {
    return (
        <section id='testimonials' className="'py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">What our users say</h2>
                <div className="grid md:grid-cols-3 gap">
                    {testimonials.map((testimonials,index) => (
                        <div key={index} className="p-6 bg-gray-100 rounded shadow">
                            <p className="italic mb-4">'{testimonials.quote}'</p>
                            <p className="font-semibold">{testimonials.name}</p>
                        </div>
                    
                     ))}
                </div>
            </div>
        </section>
    )
}
export default Testimonials;