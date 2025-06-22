import { Mail, Phone } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'

export default function Contact() {
  return (
    <section className="w-full max-w-xl px-4 py-10 flex flex-col items-center">
      <Card className="w-full bg-gradient-to-r from-blue-100 to-green-100 rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl md:text-2xl font-bold text-gray-900">
            Contact Us
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center">
          <div className="flex items-center gap-2 text-gray-800">
            <Mail className="w-5 h-5 text-primary" />
            <span>Manager: Brian</span>
          </div>
          <div className="flex items-center gap-2 text-gray-800">
            <Phone className="w-5 h-5 text-primary" />
            <span>08123456789</span>
          </div>
          <Button
            asChild
            className="mt-4 w-full max-w-xs text-base font-semibold"
            variant="default"
            size="lg"
          >
            <a href="tel:08123456789">Call Now</a>
          </Button>
        </CardContent>
      </Card>
    </section>
  )
}
