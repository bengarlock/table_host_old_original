class ReservationMailer < ApplicationMailer
  default from: "flatironreservations@flatironrestaurant-nyc.com"

  def confirmation_email(email)
    @greeting = "Hi"

    mail(
        to: email,
        subject: "Your Reservation at Flatiron Restaurant is confirmed! "
    )
  end
end
