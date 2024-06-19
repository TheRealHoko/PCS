import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from "@angular/material/grid-list";

@Component({
  selector: 'ace-subscriptions',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule
  ],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css',
})
export class SubscriptionsComponent {
  subscriptions = [
    {
      name: 'Free',
      price: 'Gratuit',
      features: [
        {
          title: 'Présence de publicités dans le contenu consulté',
          value: true
        },
        {
          title: 'Commenter, publier des avis',
          value: true
        },
        {
          title: 'Réduction permanente de 5% sur les prestations',
          value: false
        },
        {
          title: 'Prestations offertes',
          value: false
        },
        {
          title: 'Accès prioritaire à certaines prestations et aux prestations VIP',
          value: false
        },
        {
          title: 'Bonus renouvellement de l\'abonnement',
          value: false
        },
      ]
    },
    {
      name: 'Bag Packer',
      price: '9,90€ / mois ou 113€/an',
      features: [
        {
          title: 'Présence de publicités dans le contenu consulté',
          value: false
        },
        {
          title: 'Commenter, publier des avis',
          value: true
        },
        {
          title: 'Réduction permanente de 5% sur les prestations',
          value: false
        },
        {
          title: 'Prestations offertes',
          value: true,
          description: '1 par an dans la limite d\'une prestation d\'un montant inférieur à 80€'
        },
        {
          title: 'Accès prioritaire à certaines prestations et aux prestations VIP',
          value: false
        },
        {
          title: 'Bonus renouvellement de l\'abonnement',
          value: false
        },
      ]
    },
    {
      name: 'Explorator',
      price: '19€ /mois ou 220€ / an',
      features: [
        {
          title: 'Présence de publicités dans le contenu consulté',
          value: false
        },
        {
          title: 'Commenter, publier des avis',
          value: true
        },
        {
          title: 'Réduction permanente de 5% sur les prestations',
          value: true
        },
        {
          title: 'Prestations offertes',
          value: true,
          description: '1 par semestre, sans limitation du montant'
        },
        {
          title: 'Accès prioritaire à certaines prestations et aux prestations VIP',
          value: true
        },
        {
          title: 'Bonus renouvellement de l\'abonnement',
          value: true,
          description: 'Réduction de 10% du montant de l\'abonnement en cas de renouvellement, valable uniquement sur le tarif annuel.'
        },
      ]
    },
  ];
}
