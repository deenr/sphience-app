import { Component, signal, WritableSignal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Equipment } from '@core/models/types/equipment.interface';
import { LocalStorageService } from '@core/services/local-storage.service';
import { BadgeType, Color } from '@shared/components/badge/badge.component';
import { BadgeBuilder } from '@shared/components/table/builder/badge-builder';
import { TableColumnBuilder, TableColumnDataType } from '@shared/components/table/builder/table-column-builder';
import { TabsItem } from '@shared/components/tabs/tabs-item.interface';

export type EquipmentTabKey = 'all' | 'available' | 'favourites';
type EquipmentView = 'grid' | 'list';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent {
  public primaryActionButton = { icon: 'plus', text: 'Make new reservation' };
  public secondaryActionButton = { icon: 'cloud-upload', text: 'Upload document' };
  public extraActionButtons = [
    { icon: 'plus', text: 'Add device' },
    { icon: 'trash', text: 'Remove selected device(s)' }
  ];

  public tabs: TabsItem<EquipmentTabKey>[] = [
    { key: 'all', value: 'All devices' },
    { key: 'available', value: 'Available' },
    { key: 'favourites', value: 'Favourites' }
  ];
  public activeTab = this.tabs[0];

  public $equipmentView: WritableSignal<EquipmentView> = signal('list');

  public filterForm = this.formBuilder.group({
    name: this.formBuilder.control<string | null>(null),
    dates: this.formBuilder.group({
      startDate: this.formBuilder.control<Date | null>(null),
      endDate: this.formBuilder.control<Date | null>(null)
    })
  });

  public data = DATA;

  public columns = [
    new TableColumnBuilder().setField('image').setDataType(TableColumnDataType.IMAGE).build(),
    new TableColumnBuilder().setField('name').setDataType(TableColumnDataType.TITLE_AND_DESCRIPTION).setTitleAndDescription('title', 'description').setHeaderName('Device name').build(),
    new TableColumnBuilder()
      .setDataType(TableColumnDataType.BADGE)
      .setHeaderName('Availablity')
      .setField('available')
      .setBadge((badgeBuilder: BadgeBuilder) => {
        badgeBuilder
          .setKey('available')
          .setType(BadgeType.DOT)
          .setColors(
            new Map([
              [true, Color.SUCCESS],
              [false, Color.ERROR]
            ])
          )
          .setValueMap(
            new Map([
              [true, 'Available till %(availableDate)'],
              [false, 'Available from %(availableDate)']
            ])
          );
      })
      .build(),
    new TableColumnBuilder().setField('documents').setDataType(TableColumnDataType.AVATAR_GROUP).setHeaderName('Documents').build()
  ];

  private readonly EQUIPMENT_VIEW_KEY = 'EQUIPMENT_VIEW';

  public constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder
  ) {
    const tabKey = this.activatedRoute.snapshot.queryParams['tab'];
    const tab = this.tabs.find((tab) => tab.key === tabKey);
    if (tabKey && tab) {
      this.activeTab = tab;
    }

    const savedView = this.localStorageService.getItem(this.EQUIPMENT_VIEW_KEY);
    if (savedView) {
      this.onViewChange(savedView as EquipmentView);
    }
  }

  public onViewChange(view: EquipmentView): void {
    this.localStorageService.setItem(this.EQUIPMENT_VIEW_KEY, view);
    this.$equipmentView.set(view);
  }

  public onDateChange(dates: [Date, Date] | [null, null]): void {
    const { startDate, endDate } = this.filterForm.controls.dates.controls;
    startDate.setValue(dates[0]);
    endDate.setValue(dates[1]);
  }
}

const DATA: Equipment[] = [
  {
    id: 1,
    title: '3D Printer',
    description: 'A high-precision 3D printer capable of printing various materials.',
    image: 'https://s.yimg.com/ny/api/res/1.2/U2Lk5c9hgDZm.yVtUnbHJQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD03OTk-/https://media.zenfs.com/en/insidermonkey.com/8f0c4b397fc102853c0d84f0314a8014',
    available: true,
    availableDate: new Date('2024-10-30'),
    documents: [
      {
        file: new File([''], 'manual.pdf'),
        uploadedBy: {
          id: 1,
          name: 'Alice Johnson',
          email: 'alice@example.com',
          avatar: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436178.jpg?ga=GA1.1.1900149230.1729598511&semt=ais_hybrid'
        }
      },
      {
        file: new File([''], 'maintenance_log.pdf'),
        uploadedBy: {
          id: 2,
          name: 'Bob Smith',
          email: 'bob@example.com',
          avatar: 'https://img.freepik.com/free-psd/3d-illustration-business-man-with-glasses_23-2149436194.jpg?ga=GA1.1.1900149230.1729598511&semt=ais_hybrid'
        }
      }
    ]
  },
  {
    id: 2,
    title: 'Electron Microscope',
    description: 'Used for high-resolution imaging at the nanometer scale.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Electron_Microscope.jpg',
    available: false,
    availableDate: new Date('2024-12-01'),
    documents: [
      {
        file: new File([''], 'safety_guidelines.pdf'),
        uploadedBy: {
          id: 3,
          name: 'Charlie Davis',
          email: 'charlie@example.com',
          avatar: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?ga=GA1.1.1900149230.1729598511&semt=ais_hybrid'
        }
      }
    ]
  },
  {
    id: 3,
    title: 'Laser Cutter',
    description: 'A powerful laser cutter for precision cutting.',
    image: 'https://www.boxford.co.uk/wp-content/uploads/2022/08/WHHHAAAA-01.png',
    available: true,
    availableDate: new Date('2024-11-15'),
    documents: []
  },
  {
    id: 4,
    title: 'Robotic Arm',
    description: 'A robotic arm used for assembly and automation.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOUh8lQrKUPhfPjkjIY1T0GjXy8_5u4ALZUA&s',
    available: true,
    availableDate: new Date(),
    documents: [
      {
        file: new File([''], 'user_guide.pdf'),
        uploadedBy: {
          id: 4,
          name: 'Dana White',
          email: 'dana@example.com',
          avatar: 'https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436190.jpg?ga=GA1.1.1900149230.1729598511&semt=ais_hybrid'
        }
      }
    ]
  },
  {
    id: 5,
    title: 'Thermal Camera',
    description: 'A high-sensitivity thermal camera for industrial inspections.',
    image: 'https://res.cloudinary.com/rsc/image/upload/b_rgb:FFFFFF,c_pad,dpr_2.625,f_auto,h_535,q_auto,w_950/c_pad,h_535,w_950/Z8481365-01?pgw=1&pgwact=1',
    available: false,
    availableDate: new Date('2024-11-01'),
    documents: [
      {
        file: new File([''], 'specifications.pdf'),
        uploadedBy: {
          id: 5,
          name: 'Eve Clark',
          email: 'eve@example.com',
          avatar: 'https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436191.jpg?ga=GA1.1.1900149230.1729598511&semt=ais_hybrid'
        }
      },
      {
        file: new File([''], 'specifications.pdf'),
        uploadedBy: {
          id: 5,
          name: 'Eve Clark',
          email: 'eve@example.com',
          avatar: 'https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436191.jpg?ga=GA1.1.1900149230.1729598511&semt=ais_hybrid'
        }
      },
      {
        file: new File([''], 'specifications.pdf'),
        uploadedBy: {
          id: 5,
          name: 'Eve Clark',
          email: 'eve@example.com',
          avatar: 'https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436191.jpg?ga=GA1.1.1900149230.1729598511&semt=ais_hybrid'
        }
      },
      {
        file: new File([''], 'specifications.pdf'),
        uploadedBy: {
          id: 5,
          name: 'Eve Clark',
          email: 'eve@example.com',
          avatar: 'https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436191.jpg?ga=GA1.1.1900149230.1729598511&semt=ais_hybrid'
        }
      },
      {
        file: new File([''], 'specifications.pdf'),
        uploadedBy: {
          id: 5,
          name: 'Eve Clark',
          email: 'eve@example.com',
          avatar: 'https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436191.jpg?ga=GA1.1.1900149230.1729598511&semt=ais_hybrid'
        }
      },
      {
        file: new File([''], 'specifications.pdf'),
        uploadedBy: {
          id: 5,
          name: 'Eve Clark',
          email: 'eve@example.com',
          avatar: 'https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436191.jpg?ga=GA1.1.1900149230.1729598511&semt=ais_hybrid'
        }
      },
      {
        file: new File([''], 'specifications.pdf'),
        uploadedBy: {
          id: 5,
          name: 'Eve Clark',
          email: 'eve@example.com',
          avatar: 'https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436191.jpg?ga=GA1.1.1900149230.1729598511&semt=ais_hybrid'
        }
      },
      {
        file: new File([''], 'specifications.pdf'),
        uploadedBy: {
          id: 5,
          name: 'Eve Clark',
          email: 'eve@example.com',
          avatar: 'https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436191.jpg?ga=GA1.1.1900149230.1729598511&semt=ais_hybrid'
        }
      }
    ]
  }
];
