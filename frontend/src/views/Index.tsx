/*eslint-disable*/
import PlayerQuestion from '../components/PlayerQuestion'
import { Link } from 'react-router-dom'
import '../assets/styles/index.css'
export default function Index() {
  return (
    <>
    {/* 
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>PollMe</title>
       
        <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
     
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />
        <link href="css/styles.css" rel="stylesheet" />
    </head>
    */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container px-5">
                <a className="navbar-brand" href="#!">PollMe</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item"><a className="nav-link active" aria-current="page" href="#!">Home</a></li>
                        <li className="nav-item"><a className="nav-link" href="#contactus">Contact</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <header className="bg-dark py-5">
            <div className="container px-5">
                <div className="row gx-5">
                    <div className="col-lg-6">
                        <div className=" my-5">
                            <h1 className="display-5 fw-bolder text-white mb-2">Online Poll Maker</h1>
                            <p className="lead text-white-50 mb-4">Quickly create a quick, engaging poll across any device and collect user feedback, conduct market research, and decode voting behavior!</p>
                            <div className="d-grid gap-3 d-sm-flex ">

                            <Link to='/create-room'>
                                <div className="btn btn-primary btn-lg px-4 me-sm-3">Create Room</div>
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>


        <section className="py-5 border-bottom" id="features">
            <div className="container px-5 my-5">
                <div className="row gx-5">
                    <div className="col-lg-4 mb-5 mb-lg-0">
                        <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-collection"></i></div>
                        <h2 className="h4 fw-bolder">Instant Polls</h2>
                        <p>Create and share polls in seconds. All you have to do is create a Room and add the Questions.</p>
                    </div>
                    <div className="col-lg-4 mb-5 mb-lg-0">
                        <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-building"></i></div>
                        <h2 className="h4 fw-bolder">Live Polls</h2>
                        <p>Share the link with your audience and see the results update live.</p>
                    </div>
                    <div className="col-lg-4">
                        <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-toggles2"></i></div>
                        <h2 className="h4 fw-bolder">Analytics</h2>
                        <p>Gain access to a vibrant dashboard to see your poll results.</p>
                    </div>
                </div>
            </div>
        </section>
        <section className="bg-light py-5" id="contactus">
            <div className="container px-5 my-5 px-5">
                <div className="text-center mb-5">
                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-envelope"></i></div>
                    <h2 className="fw-bolder">Get in touch</h2>
                    <p className="lead mb-0">We'd love to hear from you</p>
                </div>
                <div className="row gx-5 justify-content-center">
                    <div className="col-lg-6">
            
                        <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                          
                            <div className="form-floating mb-3">
                                <input className="form-control" id="name" type="text" placeholder="Enter your name..." data-sb-validations="required" />
                                <label >Full name</label>
                                <div className="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                            </div>
                          
                            <div className="form-floating mb-3">
                                <input className="form-control" id="email" type="email" placeholder="name@example.com" data-sb-validations="required,email" />
                                <label>Email address</label>
                                <div className="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                                <div className="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                            </div>
                         
                            <div className="form-floating mb-3">
                                <input className="form-control" id="phone" type="tel" placeholder="(123) 456-7890" data-sb-validations="required" />
                                <label >Phone number</label>
                                <div className="invalid-feedback" data-sb-feedback="phone:required">A phone number is required.</div>
                            </div>
                        
                            <div className="form-floating mb-3">
                                <textarea className="form-control" id="message"  placeholder="Enter your message here..."   ></textarea>
                                <label >Message</label>
                                <div className="invalid-feedback" data-sb-feedback="message:required">A message is required.</div>
                            </div>
                        
                        
                            <div className="d-none" id="submitSuccessMessage">
                                <div className="text-center mb-3">
                                    <div className="fw-bolder">Form submission successful!</div>
                                    To activate this form, sign up at
                                    <br />
                                    <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                                </div>
                            </div>
                           
                       
                            <div className="d-none" id="submitErrorMessage"><div className="text-center text-danger mb-3">Error sending message!</div></div>
                        
                            <div className="d-grid"><button className="btn btn-primary btn-lg disabled" id="submitButton" type="submit">Submit</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <footer className="py-5 bg-dark">
            <div className="container px-5"><p className="m-0 text-center text-white">Copyright SE GROUP 26 @ 2021</p></div>
        </footer>
    
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
     
        <script src="js/scripts.js"></script>
     
        <script src="https://cdn.startbootstrap.com/sb-forms-latest.js"></script>

    </>
  )
}
