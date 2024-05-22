//
//  HelloWidgetBundle.swift
//  HelloWidget
//
//  Created by Cristian Malescov on 22.05.2024.
//

import WidgetKit
import SwiftUI

@main
struct HelloWidgetBundle: WidgetBundle {
    var body: some Widget {
        HelloWidget()
        HelloWidgetLiveActivity()
    }
}
