import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { mockBookings } from '../../services/mockData';

export default function ReservationsView() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Reservations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockBookings.map(booking => (
            <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">{booking.unit_id}</h4>
                <p className="text-sm text-gray-500">KSh {booking.total_price.toLocaleString()}</p>
              </div>
              <Badge className={booking.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'}>
                {booking.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
